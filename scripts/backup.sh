#!/usr/bin/env bash
# Daily backup script for sportsholics on the Hetzner VPS.
#
# Produces two artifacts per run under /opt/apps/sportsholics/backups:
#   db-YYYYMMDD-HHMMSS.sql.gz       — gzipped pg_dump of the Strapi database
#   uploads-YYYYMMDD-HHMMSS.tar.gz  — compressed archive of the media library
#
# Retention:
#   DB dumps    kept for DB_RETENTION_DAYS days (default 30)
#   uploads     kept for UPLOADS_RETENTION_DAYS days (default 14)
#
# Intended to be invoked by cron nightly. Logs to /var/log/sportsholics-backup.log
# when run from cron (stderr+stdout redirected in the crontab entry).
#
# Usage:
#   sudo /home/moltbot/source/sports-holics/scripts/backup.sh
#
# Cron entry (installed separately, see scripts/install-backup-cron.sh):
#   17 3 * * * /home/moltbot/source/sports-holics/scripts/backup.sh >> /var/log/sportsholics-backup.log 2>&1

set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/opt/apps/sportsholics/backups}"
UPLOADS_DIR="${UPLOADS_DIR:-/opt/apps/sportsholics/uploads}"
POSTGRES_CONTAINER="${POSTGRES_CONTAINER:-vetly-postgres}"
POSTGRES_USER="${POSTGRES_USER:-vetly}"
POSTGRES_DB="${POSTGRES_DB:-sportsholics_cms}"
DB_RETENTION_DAYS="${DB_RETENTION_DAYS:-30}"
UPLOADS_RETENTION_DAYS="${UPLOADS_RETENTION_DAYS:-14}"

STAMP=$(date -u +%Y%m%d-%H%M%S)

log() { printf '[%s] %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*"; }
fail() { log "ERROR: $*" >&2; exit 1; }

log "sportsholics backup start"

mkdir -p "$BACKUP_DIR"

# 1. Database dump
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

# 2. Uploads tarball
UPLOADS_FILE="$BACKUP_DIR/uploads-${STAMP}.tar.gz"
log "tar uploads -> $UPLOADS_FILE"
if [[ -d "$UPLOADS_DIR" ]]; then
  tar -C "$(dirname "$UPLOADS_DIR")" -czf "$UPLOADS_FILE" "$(basename "$UPLOADS_DIR")" 2>/dev/null \
    || fail "tar failed"
  UPLOADS_SIZE=$(du -h "$UPLOADS_FILE" | awk '{print $1}')
  FILE_COUNT=$(find "$UPLOADS_DIR" -type f | wc -l)
  log "tar ok ($UPLOADS_SIZE, $FILE_COUNT files)"
else
  log "WARNING: uploads dir $UPLOADS_DIR does not exist, skipping"
fi

# 3. Retention cleanup
log "retention: delete db-*.sql.gz older than ${DB_RETENTION_DAYS}d"
PRUNED_DB=$(find "$BACKUP_DIR" -maxdepth 1 -name 'db-*.sql.gz' -mtime "+${DB_RETENTION_DAYS}" -print -delete | wc -l)
log "pruned $PRUNED_DB db dumps"

log "retention: delete uploads-*.tar.gz older than ${UPLOADS_RETENTION_DAYS}d"
PRUNED_UPLOADS=$(find "$BACKUP_DIR" -maxdepth 1 -name 'uploads-*.tar.gz' -mtime "+${UPLOADS_RETENTION_DAYS}" -print -delete | wc -l)
log "pruned $PRUNED_UPLOADS upload archives"

# 4. Summary
TOTAL_SIZE=$(du -sh "$BACKUP_DIR" 2>/dev/null | awk '{print $1}')
log "backup dir total: $TOTAL_SIZE"

# 5. Off-site rsync hook (only runs if STORAGE_BOX_TARGET is set)
if [[ -n "${STORAGE_BOX_TARGET:-}" ]]; then
  log "rsync -> $STORAGE_BOX_TARGET"
  rsync -a --delete \
    --include='db-*.sql.gz' \
    --include='uploads-*.tar.gz' \
    --exclude='*' \
    "$BACKUP_DIR/" "$STORAGE_BOX_TARGET" \
    && log "rsync ok" \
    || log "rsync FAILED (continuing)"
fi

log "sportsholics backup done"
