#!/bin/bash

_file="/opt/dict/caca8.net/$1.mp3"
if [[ ! -a $_file ]]; then
  #wget -q -O "${_file}" "http://www.caca8.net/fayin/$1.mp3"
  curl -sfo "${_file}" "http://www.caca8.net/fayin/$1.mp3" --create-dirs
fi
mplayer -volume 40 $_file
