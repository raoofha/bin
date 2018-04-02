#!/usr/bin/env node

const request = require('request')
const fs = require('fs')
const exec = require('child_process').exec

const word = process.argv[2]
const f = `/opt/dict/japandict/${word}.ogg`
const adr = encodeURI(`https://www.japandict.com/voice/read?text=${word}&outputFormat=ogg_vorbis`)

const play = () => {
  exec(`mplayer -volume 40 ${f}`);
}

if (!fs.existsSync(f)) {
  exec(`curl --create-dirs -sfo ${f} "${adr}"`,play)
} else {
  play();
}
