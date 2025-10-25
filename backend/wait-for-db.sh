#!/bin/sh
set -e

host="$1"
port="$2"
timeout="${3:-30}"

echo "Esperando a que MySQL en $host:$port esté listo..."

for i in $(seq $timeout); do
  if nc -z "$host" "$port"; then
    echo "MySQL está listo!"
    exit 0
  fi
  sleep 1
done

echo "Timeout alcanzado esperando a MySQL"
exit 1
