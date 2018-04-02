#!/bin/bash
# $2: en zh-CN
_file="/opt/dict/google/$1/$2.mp3"
if [[ ! -a $_file  ]]; then
    #wget -q -U Mozilla -O "${_file}" "https://translate.google.com/translate_tts?ie=UTF-8&tl=$1&q=$2";
    #curl -A Mozilla -sfo "${_file}" "https://translate.google.com/translate_tts?ie=UTF-8&q=$2&tl=$1&total=1&idx=0&textlen=1&tk=265513.158633&client=t&prev=input&ttsspeed=0.24";
    curl -A Mozilla -sfo "${_file}" "https://translate.google.com/translate_tts?ie=UTF-8&q=$2&tl=$1&tk=265513.158633&client=t&prev=input&ttsspeed=0.24";
fi
mplayer -volume 40 $_file
