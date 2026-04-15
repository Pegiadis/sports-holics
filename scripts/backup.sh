#!/usr/bin/env bash
# Daily backup script for sportsholics on the Hetzner VPS.
#
# Artifacts produced under /opt/apps/sportsholics/backups:
#
#   db-YYYYMMDD-HHMMSS.sql.gz       Gzipped pg_dump of the Strapi database.
#                                   Created every run. Small (~3 MB).
#                                   Kept for DB_RETENTION_DAYS days (default 30).
#
#   uploads-mirror/                 Single rsync mirror of /opt/apps/sportsholics/uploads.
#                                   Updated every run with rsync --delete so it
#                                   always reflects the current state. Only deltas
#                                   are transferred day-to-day, so it's fast and
#                                   space-efficient (~913 MB peak).
#
#   uploads-weekly-YYYYMMDD.tar.gz  Compressed snapshot of the uploads mirror.
#                                   Created only on WEEKLY_SNAPSHOT_DAY (default Sun).
#                                   Kept for WEEKLY_SNAPSHOT_RETENTION_DAYS days
#                                   (default 28 = 4 weekly snapshots).
#                                   Gives point-in-time recovery for up to 4 weeks.
#
# Intended to be invoked by cron nightly. Logs to the path the crontab entry
# redirects to (usually /opt/apps/sportsholics/backups/backup.log).
#
# Environment variables:
#   BACKUP_DIR                         default /opt/apps/sportsholics/backups
#   UPLOADS_DIR                        default /opt/apps/sportsholics/uploads
#   POSTGRES_CONTAINER                 default vetly-postgres
#   POSTGRES_USER                      default vetly
#   POSTGRES_DB                        default sportsholics_cms
#   DB_RETENTION_DAYS                  default 30
#   WEEKLY_SNAPSHOT_DAY                default 0 (Sun; 0-6 where 0 is Sunday)
#   WEEKLY_SNAPSHOT_RETENTION_DAYS     default 28
#   STORAGE_BOX_TARGET                 e.g. u573928@u573928.your-storagebox.de:sportsholics/
#   STORAGE_BOX_PORT                   default 23 (Hetzner Storage Box SSH port)
#   STORAGE_BOX_SSH_KEY                default $HOME/.ssh/sportsholics-backup
#
# Usage:
#   /home/moltbot/source/sports-holics/scripts/backup.sh
#
# Force a weekly snapshot manually (outside the scheduled day):
#   FORCE_WEEKLY=1 /home/moltbot/source/sports-holics/scripts/backup.sh

set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/opt/apps/sportsholics/backups}"
UPLOADS_DIR="${UPLOADS_DIR:-/opt/apps/sportsholics/uploads}"
POSTGRES_CONTAINER="${POSTGRES_CONTAINER:-sportsholics-postgres}"
POSTGRES_USER="${POSTGRES_USER:-sportsholics}"
POSTGRES_DB="${POSTGRES_DB:-sportsholics_cms}"
DB_RETENTION_DAYS="${DB_RETENTION_DAYS:-30}"
WEEKLY_SNAPSHOT_DAY="${WEEKLY_SNAPSHOT_DAY:-0}"
WEEKLY_SNAPSHOT_RETENTION_DAYS="${WEEKLY_SNAPSHOT_RETENTION_DAYS:-28}"

STAMP=$(date -u +%Y%m%d-%H%M%S)
DAY_STAMP=$(date -u +%Y%m%d)
TODAY_DOW=$(date -u +%w)  # 0=Sunday, 6=Saturday

log() { printf '[%s] %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*"; }
fail() { log "ERROR: $*" >&2; exit 1; }

log "sportsholics backup start"

mkdir -p "$BACKUP_DIR"

# 1. Database dump (daily, gzipped, small)
DB_FILE="$BACKUP_DIR/db-${STAMP}.sql.gz"
log "pg_dump -> $DB_FILE"
if ! docker exec "$POSTGRES_CONTAINER" pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" 2>/dev/null | gzip > "$DB_FILE"; then
  rm -f "$DB_FILE"
  fail "pg_dump failed"
fi
if [[ ! -s "$DB_FILE" ]]; then
  rm -f "$DB_FILE"
  fail "pg_dump produced an empty file"
fi
DB_SIZE=$(du -h "$DB_FILE" | awk '{print $1}')
log "pg_dump ok ($DB_SIZE)"

# 2. Uploads mirror (rsync --delete — always reflects current state)
UPLOADS_MIRROR="$BACKUP_DIR/uploads-mirror"
if [[ -d "$UPLOADS_DIR" ]]; then
  mkdir -p "$UPLOADS_MIRROR"
  log "rsync uploads -> $UPLOADS_MIRROR (delta transfer)"
  rsync -a --delete "$UPLOADS_DIR/" "$UPLOADS_MIRROR/" || fail "uploads rsync to mirror failed"
  MIRROR_SIZE=$(du -sh "$UPLOADS_MIRROR" 2>/dev/null | awk '{print $1}')
  FILE_COUNT=$(find "$UPLOADS_MIRROR" -type f 2>/dev/null | wc -l)
  log "uploads mirror ok ($MIRROR_SIZE, $FILE_COUNT files)"
else
  log "WARNING: uploads dir $UPLOADS_DIR does not exist, skipping"
fi

# 3. Weekly snapshot (only on WEEKLY_SNAPSHOT_DAY, or if FORCE_WEEKLY is set)
if [[ -d "$UPLOADS_MIRROR" ]] && { [[ "$TODAY_DOW" == "$WEEKLY_SNAPSHOT_DAY" ]] || [[ -n "${FORCE_WEEKLY:-}" ]]; }; then
  SNAP_FILE="$BACKUP_DIR/uploads-weekly-${DAY_STAMP}.tar.gz"
  if [[ -f "$SNAP_FILE" ]]; then
    log "weekly snapshot for $DAY_STAMP already exists, skipping"
  else
    log "weekly snapshot -> $SNAP_FILE"
    tar -C "$BACKUP_DIR" -czf "$SNAP_FILE" uploads-mirror 2>/dev/null || fail "weekly snapshot tar failed"
    SNAP_SIZE=$(du -h "$SNAP_FILE" | awk '{print $1}')
    log "weekly snapshot ok ($SNAP_SIZE)"
  fi
else
  log "not a weekly snapshot day (today dow=$TODAY_DOW, snapshot day=$WEEKLY_SNAPSHOT_DAY), skipping snapshot"
fi

# 4. Retention cleanup
log "retention: delete db-*.sql.gz older than ${DB_RETENTION_DAYS}d"
PRUNED_DB=$(find "$BACKUP_DIR" -maxdepth 1 -name 'db-*.sql.gz' -mtime "+${DB_RETENTION_DAYS}" -print -delete | wc -l)
log "pruned $PRUNED_DB db dumps"

log "retention: delete uploads-weekly-*.tar.gz older than ${WEEKLY_SNAPSHOT_RETENTION_DAYS}d"
PRUNED_WEEKLY=$(find "$BACKUP_DIR" -maxdepth 1 -name 'uploads-weekly-*.tar.gz' -mtime "+${WEEKLY_SNAPSHOT_RETENTION_DAYS}" -print -delete | wc -l)
log "pruned $PRUNED_WEEKLY weekly snapshots"

# 5. Summary
TOTAL_SIZE=$(du -sh "$BACKUP_DIR" 2>/dev/null | awk '{print $1}')
log "backup dir total: $TOTAL_SIZE"

# 6. Off-site rsync hook (only runs if STORAGE_BOX_TARGET is set)
# Hetzner Storage Box specifics:
#   - SSH port is 23 (not 22) — configurable via STORAGE_BOX_PORT
#   - SSH key path — configurable via STORAGE_BOX_SSH_KEY
#   - Restricted shell on the Storage Box rejects arbitrary commands, but
#     rsync works fine because it uses its own protocol over SSH.
# The push is a full mirror of the backup dir (excluding logs), so whatever
# retention policy we apply locally is reflected on the Storage Box too.
if [[ -n "${STORAGE_BOX_TARGET:-}" ]]; then
  SB_PORT="${STORAGE_BOX_PORT:-23}"
  SB_KEY="${STORAGE_BOX_SSH_KEY:-$HOME/.ssh/sportsholics-backup}"
  log "rsync -> $STORAGE_BOX_TARGET (port $SB_PORT, key $SB_KEY)"
  rsync -a --delete \
    --exclude='backup.log' \
    --exclude='transfer-*.log' \
    --exclude='*.tmp' \
    -e "ssh -i $SB_KEY -p $SB_PORT -oStrictHostKeyChecking=accept-new -oPasswordAuthentication=no" \
    "$BACKUP_DIR/" "$STORAGE_BOX_TARGET" \
    && log "rsync ok" \
    || log "rsync FAILED (continuing)"
fi

log "sportsholics backup done"
