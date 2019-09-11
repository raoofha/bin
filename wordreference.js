#!/usr/bin/env node

const cheerio = require("cheerio")
const request = require('request')
const fs = require('fs')
const exec = require('child_process').exec

const lang = "es"
const word = process.argv[2]
const accent = process.argv[3]
const fdir = `/opt/dict/wordreference/${lang}/${accent}/`
const f = `${fdir}/${word}.mp3`

const accents = {
  "mexico" : 0,
  "castellano" : 1,
  "argentina" : 2
}

const play = () => {
  exec(`mplayer -volume 40 ${f}`);
}

const options = {
  url: encodeURI(`http://www.wordreference.com/es/en/translation.asp?spen=${word}`),
  headers: {
    'User-Agent': 'chromium'
  }
};

if (!fs.existsSync(f)) {
  request(options, (err, res, body) => {
    if (body) {
      const $ = cheerio.load(body);
      const adr = "http://www.wordreference.com" + $("source").get(accents[accent]).attribs.src
      console.log(word, adr)
      if (adr) {
        exec(`curl -A chromium -sfo ${f} --create-dirs ${adr}`,play);
      }
    }
  })
} else {
  play();
}
