#!/bin/sh
# Download any generated image in sources.txt not yet in raw/
cd "$(dirname "$0")"
while read -r name url; do
  [ -z "$name" ] && continue
  [ -f "raw/$name.png" ] || curl -sL -o "raw/$name.png" "$url"
done < sources.txt
ls raw | wc -l
