#!/usr/bin/env bash
set -euo pipefail

cd /opt/teli

BACKUP_DIR="${TELI_BACKUP_DIR:-/home/teli/backups/mongo}"
TIMESTAMP=$(date -u +%Y%m%dT%H%M%SZ)

mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR"
umask 077

TMP_DIR=$(mktemp -d "$BACKUP_DIR/.tmp-$TIMESTAMP-XXXXXX")
FINAL_DIR="$BACKUP_DIR/$TIMESTAMP"

trap 'rm -rf -- "$TMP_DIR"' EXIT

docker compose exec -T mongo sh -c '
  exec mongodump \
    --username "$MONGO_INITDB_ROOT_USERNAME" \
    --password "$MONGO_INITDB_ROOT_PASSWORD" \
    --authenticationDatabase admin \
    --db teliapi2 \
    --collection authors \
    --archive \
    --gzip
' > "$TMP_DIR/authors.archive.gz"

docker compose exec -T mongo sh -c '
  exec mongoexport \
    --username "$MONGO_INITDB_ROOT_USERNAME" \
    --password "$MONGO_INITDB_ROOT_PASSWORD" \
    --authenticationDatabase admin \
    --db teliapi2 \
    --collection authors \
    --jsonArray \
    --pretty
' > "$TMP_DIR/authors.json"

mv "$TMP_DIR" "$FINAL_DIR"
trap - EXIT

echo "Backup completed: $FINAL_DIR"

# Remove completed backups older than 14 days
find "$BACKUP_DIR" \
  -mindepth 1 -maxdepth 1 \
  -type d \
  -name '????????T??????Z' \
  -mtime +13 \
  -exec rm -rf -- {} +
