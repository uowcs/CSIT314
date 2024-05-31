#!/bin/sh
# Load environment variables
# ls -la
set -a
. ./.env
set +a

# Execute CMD
exec "$@"
