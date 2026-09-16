#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%F_%H-%M-%S)
mkdir -p $BACKUP_DIR

# Backup docker container logs
docker logs capstone-app > "$BACKUP_DIR/app_log_$DATE.log" 2>&1

# Delete backups older than 7 days
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed at $DATE" >> /home/ubuntu/backup_cron.log