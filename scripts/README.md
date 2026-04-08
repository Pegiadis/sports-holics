# Operational scripts

Ops scripts for the sportsholics deployment on the Hetzner VPS. Intended to be
run on the VPS itself (not locally), from inside the repo at
`/home/moltbot/source/sports-holics`.

## What's here

| Script | Purpose | Invocation |
|---|---|---|
| `deploy.sh` | Safe deploy: backup → pull → build → up → smoke test | `./scripts/deploy.sh` |
| `backup.sh` | Daily DB dump + uploads tarball with retention | cron (nightly) |

## deploy.sh

Performs a safe deploy of the latest `feature/docker-deployment` (or whatever
branch is currently checked out) to the running containers.

What it does, in order:

1. Takes a pre-deploy snapshot of the Strapi DB via `pg_dump`
2. `git fetch` + `git pull --ff-only` (refuses to clobber local edits)
3. Validates `docker-compose.yml`
4. `docker compose build` — only services whose source changed actually rebuild
5. `docker compose up -d` — only services whose config/image changed are recreated
6. Waits up to 90s for both containers to report `healthy`
7. Smoke-tests Strapi API + frontend root + a random image URL

**What it never touches (data is safe):**

- `/opt/apps/sportsholics/uploads/` — Strapi media library (bind mount)
- `/opt/apps/sportsholics/next-image-cache/` — Next.js image cache (bind mount)
- `/opt/apps/sportsholics/backups/` — the backups themselves
- `vetly-postgres` named volume — the Strapi database

### Normal deploy

```bash
./scripts/deploy.sh
```

### Skipping the pre-deploy backup (not recommended)

```bash
./scripts/deploy.sh --no-backup
```

### Deploying the current checkout without pulling (e.g. after a rollback)

```bash
./scripts/deploy.sh --skip-pull
```

### Rollback to the previous commit

```bash
git reset --hard HEAD~1
./scripts/deploy.sh --no-backup --skip-pull
```

### Rollback to a specific commit

```bash
git reset --hard <sha>
./scripts/deploy.sh --no-backup --skip-pull
```

## backup.sh

Produces two artifacts per run under `/opt/apps/sportsholics/backups`:

- `db-YYYYMMDD-HHMMSS.sql.gz` — gzipped `pg_dump` of `sportsholics_cms`
- `uploads-YYYYMMDD-HHMMSS.tar.gz` — gzipped tar of the media library

Retention:

- DB dumps: 30 days
- Upload archives: 14 days

Both retention windows are configurable via environment variables at the top
of the script.

### Install the cron job

```bash
# as the moltbot user, once
sudo tee /etc/cron.d/sportsholics-backup > /dev/null <<'EOF'
# Daily sportsholics backup at 03:17 UTC
17 3 * * * moltbot /home/moltbot/source/sports-holics/scripts/backup.sh >> /var/log/sportsholics-backup.log 2>&1
EOF
sudo touch /var/log/sportsholics-backup.log
sudo chown moltbot:moltbot /var/log/sportsholics-backup.log
```

### Run manually to test

```bash
./scripts/backup.sh
```

### Off-site rsync (optional, recommended)

If `STORAGE_BOX_TARGET` is set in the environment (e.g. via `/etc/environment`
or exported in the cron entry), the script will `rsync` the backup dir to that
target after the local backup completes. Intended for Hetzner Storage Box or a
similar offsite target.

Example cron entry with off-site:

```
17 3 * * * moltbot STORAGE_BOX_TARGET=u123456@u123456.your-storagebox.de:sportsholics/ /home/moltbot/source/sports-holics/scripts/backup.sh >> /var/log/sportsholics-backup.log 2>&1
```

Requires passwordless SSH to the Storage Box from the moltbot user.

## Things you must NEVER run on this VPS

These commands can destroy data. Avoid them.

| Never run | Why |
|---|---|
| `docker compose down -v` | `-v` deletes named volumes — would wipe Postgres |
| `docker volume rm <anything>` | Permanent |
| `docker system prune -a --volumes` | The `--volumes` flag is destructive |
| `rm -rf /opt/apps/sportsholics/uploads` | Wipes 7000+ media files |
| `rm -rf /opt/apps/sportsholics/backups` | Wipes the safety net |
| `node backend/sportsholics-cms/scripts/cleanup-production.js` | Legacy cleanup script — will delete content from whatever Strapi it's pointed at |
| `git push --force` on shared branches | Loses history, confuses rollbacks |

Plain `docker system prune` (no `--volumes`, no `-a`) is safe.
