#!/usr/bin/env bash
# Comprehensive smoke test for the sportsholics deployment.
#
# Hits every critical surface area and asserts it works:
#   - Strapi API responding with valid data
#   - Article content is HTML (not blocks JSON or [object Object] corruption)
#   - Image URLs accessible
#   - Frontend pages render
#   - Container health (when run from VPS)
#   - DB integrity (when run from VPS)
#   - No recent error spike in strapi logs (when run from VPS)
#
# Output: color-coded pass/fail per check + final summary.
# Exit 0 if all checks pass, 1 otherwise.
#
# Usage:
#   ./scripts/smoke-test.sh                                # uses default duckdns URL
#   BASE_URL=https://sportsholics.gr ./scripts/smoke-test.sh   # test prod after cutover
#   SKIP_DB_CHECKS=1 ./scripts/smoke-test.sh               # run from outside VPS (no docker)
#   FAST=1 ./scripts/smoke-test.sh                         # skip slower per-article assertions
#
# Environment variables:
#   BASE_URL              default https://sportsholics.duckdns.org
#   SAMPLE_SIZE           how many random items to spot-check (default 20)
#   POSTGRES_CONTAINER    default sportsholics-postgres
#   POSTGRES_USER         default sportsholics
#   POSTGRES_DB           default sportsholics_cms
#   STRAPI_CONTAINER      default sportsholics-strapi
#   FRONTEND_CONTAINER    default sportsholics-frontend
#   SKIP_DB_CHECKS        if set, skip DB / docker checks (use when not on VPS)
#   FAST                  if set, smaller SAMPLE_SIZE for faster runs
#
# Exit codes:
#   0  all checks passed
#   1  one or more checks failed
#   2  configuration error (e.g. no curl available)

set -uo pipefail

BASE_URL="${BASE_URL:-https://sportsholics.duckdns.org}"
BASE_URL="${BASE_URL%/}"  # strip trailing slash
SAMPLE_SIZE="${SAMPLE_SIZE:-20}"
[[ -n "${FAST:-}" ]] && SAMPLE_SIZE=5

POSTGRES_CONTAINER="${POSTGRES_CONTAINER:-sportsholics-postgres}"
POSTGRES_USER="${POSTGRES_USER:-sportsholics}"
POSTGRES_DB="${POSTGRES_DB:-sportsholics_cms}"
STRAPI_CONTAINER="${STRAPI_CONTAINER:-sportsholics-strapi}"
FRONTEND_CONTAINER="${FRONTEND_CONTAINER:-sportsholics-frontend}"

# Auto-detect: if `docker` isn't available, skip DB/container checks
if ! command -v docker >/dev/null 2>&1; then
  SKIP_DB_CHECKS=1
fi

PASS=0
FAIL=0
FAILED_CHECKS=()

# ---------- presentation helpers ----------
if [[ -t 1 ]]; then
  C_RED='\033[31m'
  C_GREEN='\033[32m'
  C_YELLOW='\033[33m'
  C_BLUE='\033[1;34m'
  C_DIM='\033[2m'
  C_RESET='\033[0m'
else
  C_RED=''; C_GREEN=''; C_YELLOW=''; C_BLUE=''; C_DIM=''; C_RESET=''
fi

section() { printf "\n${C_BLUE}==> %s${C_RESET}\n" "$*"; }
pass() { printf "  ${C_GREEN}ok${C_RESET}  %s\n" "$*"; PASS=$((PASS+1)); }
fail() { printf "  ${C_RED}ERR${C_RESET} %s\n" "$*"; FAIL=$((FAIL+1)); FAILED_CHECKS+=("$*"); }
skip() { printf "  ${C_YELLOW}--${C_RESET}  %s ${C_DIM}(skipped)${C_RESET}\n" "$*"; }

# Sanity
command -v curl >/dev/null 2>&1 || { echo "curl not found, abort" >&2; exit 2; }

# ---------- HTTP helpers ----------
http_code() {
  curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$1" 2>/dev/null || echo "000"
}

http_body() {
  curl -s --max-time 15 "$1" 2>/dev/null
}

# ---------- 1. Strapi API liveness ----------
section "Strapi API liveness"

CODE=$(http_code "$BASE_URL/admin")
[[ "$CODE" = "200" ]] && pass "/admin returns 200" || fail "/admin returns $CODE"

for endpoint in football-articles basketball-articles formula1-articles news-articles blog-articles journalists; do
  CODE=$(http_code "$BASE_URL/api/$endpoint?pagination%5Blimit%5D=1")
  [[ "$CODE" = "200" ]] && pass "/api/$endpoint returns 200" || fail "/api/$endpoint returns $CODE"
done

CODE=$(http_code "$BASE_URL/api/breaking-news-items?pagination%5Blimit%5D=1")
[[ "$CODE" = "200" ]] && pass "/api/breaking-news-items returns 200" || fail "/api/breaking-news-items returns $CODE"

# Validate response shape
BODY=$(http_body "$BASE_URL/api/football-articles?pagination%5Blimit%5D=1&populate%5B0%5D=image")
if echo "$BODY" | grep -q '"data"\s*:\s*\['; then
  pass "/api/football-articles response has 'data' array"
else
  fail "/api/football-articles response has no 'data' array"
fi
if echo "$BODY" | grep -q '"meta"'; then
  pass "/api/football-articles response has 'meta' object"
else
  fail "/api/football-articles response has no 'meta' object"
fi

# ---------- 2. Content integrity ----------
section "Content integrity (sample $SAMPLE_SIZE rows)"

# Fetch articles with content, validate text-block content is HTML
CONTENT_JSON=$(http_body "$BASE_URL/api/football-articles?pagination%5Blimit%5D=$SAMPLE_SIZE&populate%5Bcontent%5D%5Bpopulate%5D=*")
if [[ -z "$CONTENT_JSON" ]] || ! echo "$CONTENT_JSON" | grep -q '"data"'; then
  fail "could not fetch article content sample"
else
  # Extract every text-block content field's first 4 chars
  # If it's HTML it'll start with '<' (often '<p>'); if it's '[object Object]' or '[{' that's broken
  PREVIEWS=$(echo "$CONTENT_JSON" | grep -oE '"__component":"article.text-block","[^"]*":[0-9]+,"content":"[^"]{0,4}' | head -$SAMPLE_SIZE)
  if [[ -z "$PREVIEWS" ]]; then
    skip "no text-block components found in sample (small dataset?)"
  else
    HTML_OK=$(echo "$PREVIEWS" | grep -c 'content":"<' || true)
    HTML_OK=${HTML_OK:-0}
    BAD_OBJECT=$(echo "$PREVIEWS" | grep -c '\[object' || true)
    BAD_OBJECT=${BAD_OBJECT:-0}
    BAD_BLOCKS=$(echo "$PREVIEWS" | grep -c 'content":"\[{' || true)
    BAD_BLOCKS=${BAD_BLOCKS:-0}
    TOTAL=$(echo "$PREVIEWS" | wc -l)

    if (( BAD_OBJECT > 0 )); then
      fail "$BAD_OBJECT/$TOTAL text-blocks contain '[object Object]' corruption"
    else
      pass "0 text-blocks contain '[object Object]' corruption"
    fi

    if (( BAD_BLOCKS > 0 )); then
      fail "$BAD_BLOCKS/$TOTAL text-blocks still in JSON blocks format (unmigrated)"
    else
      pass "0 text-blocks still in JSON blocks format"
    fi

    if (( HTML_OK > 0 )); then
      pass "$HTML_OK/$TOTAL text-blocks start with '<' (HTML)"
    else
      fail "0 text-blocks start with '<' (none look like HTML)"
    fi
  fi
fi

# Spot-check random image URLs from the API
IMAGES=$(http_body "$BASE_URL/api/upload/files?pagination%5Blimit%5D=$SAMPLE_SIZE" 2>/dev/null \
  | grep -oE '"url":"/uploads/[^"]*"' | sed 's/"url":"//; s/"//' | head -$SAMPLE_SIZE)

if [[ -z "$IMAGES" ]]; then
  # Fallback: extract image URLs from article responses
  IMAGES=$(echo "$CONTENT_JSON" | grep -oE '"url":"/uploads/[^"]*"' | sed 's/"url":"//; s/"//' | sort -u | head -$SAMPLE_SIZE)
fi

if [[ -z "$IMAGES" ]]; then
  skip "no image URLs found in sample"
else
  IMG_OK=0
  IMG_TOTAL=0
  while IFS= read -r url; do
    [[ -z "$url" ]] && continue
    IMG_TOTAL=$((IMG_TOTAL+1))
    CODE=$(http_code "$BASE_URL$url")
    [[ "$CODE" = "200" ]] && IMG_OK=$((IMG_OK+1))
  done <<< "$IMAGES"

  if (( IMG_OK == IMG_TOTAL )); then
    pass "$IMG_OK/$IMG_TOTAL random image URLs return 200"
  else
    fail "$IMG_OK/$IMG_TOTAL random image URLs return 200"
  fi
fi

# ---------- 3. Frontend liveness ----------
section "Frontend liveness"

CODE=$(http_code "$BASE_URL/")
[[ "$CODE" = "200" ]] && pass "/ returns 200" || fail "/ returns $CODE"

for path in football basketball formula1 blog scores teams; do
  CODE=$(http_code "$BASE_URL/$path")
  [[ "$CODE" = "200" ]] && pass "/$path returns 200" || fail "/$path returns $CODE"
done

# Pick a random article slug from the API and visit the article page
RANDOM_SLUG=$(http_body "$BASE_URL/api/football-articles?pagination%5Blimit%5D=10" \
  | grep -oE '"slug":"[^"]+"' | sed 's/"slug":"//; s/"$//' | shuf -n 1 2>/dev/null)
if [[ -n "$RANDOM_SLUG" ]]; then
  CODE=$(http_code "$BASE_URL/article/$RANDOM_SLUG")
  [[ "$CODE" = "200" ]] && pass "/article/$RANDOM_SLUG returns 200" || fail "/article/$RANDOM_SLUG returns $CODE"

  # Check the page actually contains rendered content.
  # Use heredoc form (<<<) instead of `echo "$HTML" | grep` because the
  # response is large (~160KB) and `grep -q` early-exits, sending SIGPIPE
  # to echo, which combined with pipefail returns non-zero even when the
  # match succeeded.
  HTML=$(http_body "$BASE_URL/article/$RANDOM_SLUG")
  if grep -qE '<(p|h[1-6]|strong|em)[^>]*>' <<< "$HTML"; then
    pass "/article/$RANDOM_SLUG renders inline HTML tags"
  else
    fail "/article/$RANDOM_SLUG does not contain inline HTML tags (renderer broken?)"
  fi
else
  skip "could not pick a random slug for article page test"
fi

# ---------- 4. DB integrity (VPS only) ----------
if [[ -z "${SKIP_DB_CHECKS:-}" ]]; then
  section "DB integrity"

  if ! docker ps --format '{{.Names}}' | grep -q "^${POSTGRES_CONTAINER}$"; then
    fail "postgres container '$POSTGRES_CONTAINER' not running"
  else
    pq() { docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc "$1" 2>/dev/null | tr -d ' '; }

    FOOTBALL_COUNT=$(pq "SELECT count(*) FROM football_articles;")
    BASKETBALL_COUNT=$(pq "SELECT count(*) FROM basketball_articles;")
    FILE_COUNT=$(pq "SELECT count(*) FROM files;")
    TEXT_BLOCK_COUNT=$(pq "SELECT count(*) FROM components_article_text_blocks;")

    [[ "${FOOTBALL_COUNT:-0}" -gt 1000 ]] && pass "football_articles count = $FOOTBALL_COUNT (> 1000)" \
      || fail "football_articles count = ${FOOTBALL_COUNT:-0} (expected > 1000)"
    [[ "${BASKETBALL_COUNT:-0}" -gt 500 ]] && pass "basketball_articles count = $BASKETBALL_COUNT (> 500)" \
      || fail "basketball_articles count = ${BASKETBALL_COUNT:-0} (expected > 500)"
    [[ "${FILE_COUNT:-0}" -gt 1000 ]] && pass "files count = $FILE_COUNT (> 1000)" \
      || fail "files count = ${FILE_COUNT:-0} (expected > 1000)"
    [[ "${TEXT_BLOCK_COUNT:-0}" -gt 1000 ]] && pass "text_blocks count = $TEXT_BLOCK_COUNT (> 1000)" \
      || fail "text_blocks count = ${TEXT_BLOCK_COUNT:-0} (expected > 1000)"

    # Check no rows have [object Object] corruption
    CORRUPT=$(pq "SELECT count(*) FROM components_article_text_blocks WHERE content LIKE '%[object Object]%';")
    [[ "${CORRUPT:-0}" = "0" ]] && pass "0 rows with '[object Object]' corruption" \
      || fail "$CORRUPT rows have '[object Object]' corruption"

    # Check content column is text type (post-migration state)
    COL_TYPE=$(pq "SELECT data_type FROM information_schema.columns WHERE table_name='components_article_text_blocks' AND column_name='content';")
    [[ "$COL_TYPE" = "text" ]] && pass "content column type = text (post-CKEditor-migration)" \
      || fail "content column type = '$COL_TYPE' (expected 'text')"

    # Check scheduledPublishAt column exists
    SCHED_COUNT=$(pq "SELECT count(*) FROM information_schema.columns WHERE column_name='scheduled_publish_at';")
    [[ "${SCHED_COUNT:-0}" -ge 5 ]] && pass "scheduled_publish_at exists on $SCHED_COUNT tables (expected >= 5)" \
      || fail "scheduled_publish_at exists on only ${SCHED_COUNT:-0} tables (expected >= 5)"

    # Sample 5 random text-blocks: assert content starts with '<'
    NON_HTML=$(pq "SELECT count(*) FROM (SELECT content FROM components_article_text_blocks ORDER BY random() LIMIT 50) sample WHERE content !~ '^<' AND content <> '';")
    [[ "${NON_HTML:-0}" = "0" ]] && pass "50 random text-blocks all start with '<' or are empty" \
      || fail "$NON_HTML/50 sampled text-blocks don't start with '<' (not HTML?)"
  fi
else
  section "DB integrity"
  skip "DB checks (SKIP_DB_CHECKS or no docker access)"
fi

# ---------- 5. Container health (VPS only) ----------
if [[ -z "${SKIP_DB_CHECKS:-}" ]]; then
  section "Container health"

  for c in "$STRAPI_CONTAINER" "$FRONTEND_CONTAINER" "$POSTGRES_CONTAINER"; do
    STATUS=$(docker ps --filter "name=^${c}$" --format '{{.Status}}' 2>/dev/null)
    if [[ -z "$STATUS" ]]; then
      fail "$c not running"
    elif echo "$STATUS" | grep -q "(healthy)"; then
      pass "$c is healthy"
    elif echo "$STATUS" | grep -q "(unhealthy)"; then
      fail "$c is UNHEALTHY ($STATUS)"
    else
      pass "$c is up ($STATUS)"
    fi
  done
else
  section "Container health"
  skip "container checks (SKIP_DB_CHECKS or no docker access)"
fi

# ---------- 6. Recent log errors (VPS only) ----------
if [[ -z "${SKIP_DB_CHECKS:-}" ]]; then
  section "Recent log errors"

  if docker ps --format '{{.Names}}' | grep -q "^${STRAPI_CONTAINER}$"; then
    # Count errors in last 1 hour, excluding the noisy scheduled-publish messages
    # which are expected during normal cron operation
    ERR_COUNT=$(docker logs --since 1h "$STRAPI_CONTAINER" 2>&1 \
      | grep -E '\[error\]' \
      | grep -v 'scheduled-publish' \
      | wc -l)

    if [[ "${ERR_COUNT:-0}" = "0" ]]; then
      pass "0 [error] log lines in strapi (last 1h, excluding cron noise)"
    elif [[ "${ERR_COUNT:-0}" -lt 5 ]]; then
      pass "$ERR_COUNT [error] log lines in strapi (last 1h, < 5 is acceptable)"
    else
      fail "$ERR_COUNT [error] log lines in strapi (last 1h, expected < 5)"
    fi
  else
    skip "strapi container not running, can't check logs"
  fi
else
  section "Recent log errors"
  skip "log checks (SKIP_DB_CHECKS or no docker access)"
fi

# ---------- final summary ----------
TOTAL=$((PASS + FAIL))
echo
if (( FAIL == 0 )); then
  printf "${C_GREEN}ALL CHECKS PASSED (%d/%d)${C_RESET}\n" "$PASS" "$TOTAL"
  exit 0
else
  printf "${C_RED}%d/%d CHECKS FAILED${C_RESET}\n" "$FAIL" "$TOTAL"
  echo
  echo "Failed checks:"
  for c in "${FAILED_CHECKS[@]}"; do
    printf "  ${C_RED}-${C_RESET} %s\n" "$c"
  done
  exit 1
fi
