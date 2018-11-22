#!/usr/bin/env node

const cheerio = require("cheerio")
const request = require('request')
const fs = require('fs')
const exec = require('child_process').exec

const lang = process.argv[2]
const word = process.argv[3]
const fdir = `/opt/dict/reverso.net/${lang}`
const f = `${fdir}/${word}.mp3`

const play = () => {
  exec(`mplayer -volume 40 ${f}`);
}

if (!fs.existsSync(f)) {
  exec(`curl -sfo ${f} --create-dirs https://voice2.reverso.net/RestPronunciation.svc/v1/output=json/GetVoiceStream/voiceName=Klaus22k?inputText=${Buffer.from(word).toString('base64')}&voiceSpeed=85`, play);
}else{
  play();
}

