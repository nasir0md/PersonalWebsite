#!/bin/sh
s1="hmm"

inotifywait -m -r -e create ./static/ | while read line; do

  s2="amm"
  if [ "$s1" = "amm" ]
  then
    s2="umm"
  fi
  if [ "$s1" = "umm" ]
  then
    s2="hmm"
  fi

  sed -i "s/$s1/$s2/g" src/pages/BlogView.vue
  s1="$s2"

done
