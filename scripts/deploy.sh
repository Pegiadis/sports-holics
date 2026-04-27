#!/usr/bin/env bash
# Safe deploy script for sportsholics on the Hetzner VPS.
#
# What it does, in order:
#   1. pg_dump the Strapi DB to a pre-deploy snapshot under /opt/apps/sportsholics/backups
#   2. git fetch + git pull --ff-only on the current branch (refuses to clobber local edits)
#   3. validate docker-compose.yml with `docker compose config --quiet`
#   4. docker compose build   (only services whose source changed actually rebuild)
#   5. docker compose up -d   (only services whose config/image changed are recreated)
#   6. wait up to 90s for both containers to report healthy
#   7. smoke test Strapi API + frontend root via the public Caddy URL
#
# What it does NOT touch (data is safe):
#   - /opt/apps/sportsholics/uploads/          (Strapi media library, bind mount)
#   - /opt/apps/sportsholics/next-image-cache/ (Next.js image optimizer cache, bind mount)
#   - /opt/apps/sportsholics/backups/          (backups, plain host dir)
#   - vetly-postgres named volume              (Strapi DB)
#
# Usage:
#   ./scripts/deploy.sh                     # normal deploy (backup + pull + build + up + verify)
#   ./scripts/deploy.sh --no-backup         # skip the pre-deploy DB backup (not recommended)
#   ./scripts/deploy.sh --skip-pull         # don't git pull; just rebuild from current checkout
#
# Rollback to the previous commit:
#   git reset --hard HEAD~1 && ./scripts/deploy.sh --no-backup --skip-pull
#
# Rollback to a specific commit:
#   git reset --hard <sha> && ./scripts/deploy.sh --no-backup --skip-pull

set -euo pipefail

# cd to repo root regardless of where the script was invoked from
cd "$(dirname "$0")/.."

BACKUP_DIR="/opt/apps/sportsholics/backups"
POSTGRES_CONTAINER="sportsholics-postgres"
POSTGRES_USER="sportsholics"
POSTGRES_DB="sportsholics_cms"
PUBLIC_URL="https://sportsholics.duckdns.org"
STAMP=$(date -u +%Y%m%d-%H%M%S)

SKIP_BACKUP=false
SKIP_PULL=false
for arg in "$@"; do
  case "$arg" in
    --no-backup) SKIP_BACKUP=true ;;
    --skip-pull) SKIP_PULL=true ;;
    -h|--help)
      sed -n '2,28p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *)
      echo "Unknown arg: $arg" >&2
      echo "Usage: $0 [--no-backup] [--skip-pull]" >&2
      exit 1
      ;;
  esac
done

say() { printf '\n\033[1;34m==>\033[0m \033[1m%s\033[0m\n' "$*"; }
ok()  { printf '  \033[32mok\033[0m  %s\n' "$*"; }
bad() { printf '  \033[31mERR\033[0m %s\n' "$*" >&2; }

fail() {
  bad "$1"
  echo
  echo "Deploy aborted. Data is untouched. Current containers:"
  docker ps --filter name=sportsholics --format "  {{.Names}}  {{.Status}}"
  echo
  echo "To see logs:  docker logs sportsholics-strapi --tail 100"
  echo "              docker logs sportsholics-frontend --tail 100"
  exit 1
}

# 1. Pre-deploy DB backup
if [[ "$SKIP_BACKUP" = false ]]; then
  say "Pre-deploy DB backup"
  mkdir -p "$BACKUP_DIR"
  BACKUP_FILE="$BACKUP_DIR/db-predeploy-${STAMP}.sql.gz"
  docker exec "$POSTGRES_CONTAINER" pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" 2>/dev/null \
    | gzip > "$BACKUP_FILE" \
    || fail "pg_dump failed"
  SIZE=$(ls -lh "$BACKUP_FILE" | awk '{print $5}')
  ok "Saved: $BACKUP_FILE ($SIZE)"
else
  say "Skipping pre-deploy backup (--no-backup)"
fi

# 2. Fetch + fast-forward pull
if [[ "$SKIP_PULL" = false ]]; then
  say "Fetch + fast-forward pull"
  git fetch --quiet origin
  BRANCH=$(git branch --show-current)
  BEFORE=$(git rev-parse HEAD)
  git pull --ff-only origin "$BRANCH" || fail "git pull failed (non-ff? local edits?)"
  AFTER=$(git rev-parse HEAD)
  if [[ "$BEFORE" = "$AFTER" ]]; then
    ok "Already up to date"
  else
    ok "Advanced $BEFORE → $AFTER"
    git --no-pager log --oneline "$BEFORE..$AFTER" | sed 's/^/     /'
  fi
else
  say "Skipping git pull (--skip-pull)"
fi

# 3. Validate compose
say "Validate docker-compose.yml"
docker compose config --quiet || fail "compose file invalid"
ok "syntax valid"

# 4. Build
say "docker compose build"
docker compose build || fail "build failed"
ok "images built"

# 5. Up
say "docker compose up -d"
docker compose up -d || fail "compose up failed"
ok "containers up"

# 6. Wait for health
say "Waiting for healthchecks (up to 90s)"
for i in $(seq 1 18); do
  sleep 5
  HEALTHY=$(docker ps --filter name=sportsholics --format '{{.Status}}' | grep -c 'healthy' || true)
  if [[ "$HEALTHY" -eq 2 ]]; then
    ok "both containers healthy"
    break
  fi
  if [[ $i -eq 18 ]]; then
    fail "containers did not become healthy in 90s"
  fi
done

# 7. Smoke test — delegate to scripts/smoke-test.sh which has comprehensive
#    checks (API liveness, content integrity, frontend, DB, containers, logs).
#    Use FAST=1 to keep the deploy fast — full smoke test can be run anytime
#    via `./scripts/smoke-test.sh` directly.
say "Smoke test"
SMOKE_TEST_SCRIPT="$(dirname "$0")/smoke-test.sh"
if [[ -x "$SMOKE_TEST_SCRIPT" ]]; then
  if BASE_URL="$PUBLIC_URL" \
     POSTGRES_CONTAINER="$POSTGRES_CONTAINER" \
     POSTGRES_USER="$POSTGRES_USER" \
     POSTGRES_DB="$POSTGRES_DB" \
     FAST=1 \
     "$SMOKE_TEST_SCRIPT"; then
    ok "smoke-test.sh passed"
  else
    fail "smoke-test.sh reported failures (see output above)"
  fi
else
  # Fallback: run the minimal inline smoke test if the script is missing.
  STRAPI_CODE=$(curl -s -o /dev/null -w '%{http_code}' "$PUBLIC_URL/api/football-articles?pagination%5Blimit%5D=1" || echo "000")
  [[ "$STRAPI_CODE" = "200" ]] && ok "strapi API returns 200" || fail "strapi API returns $STRAPI_CODE"
  FRONTEND_CODE=$(curl -s -o /dev/null -w '%{http_code}' "$PUBLIC_URL/" || echo "000")
  [[ "$FRONTEND_CODE" = "200" ]] && ok "frontend returns 200" || fail "frontend returns $FRONTEND_CODE"
fi

say "Deploy successful"
printf '\nDeployed commit: %s\n\n' "$(git log -1 --oneline)"
