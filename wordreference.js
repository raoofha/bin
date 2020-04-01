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
  exec(`mplayer -volume 60 ${f}`);
}

const options = {
  url: encodeURI(`https://www.wordreference.com/es/en/translation.asp?spen=${word}`),
  headers: { 'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36'}
};

  var customHeaderRequest = request.defaults({
      headers: {'user-agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36"}
  });

if (!fs.existsSync(f)) {
  //request(options, (err, res, body) => {
  customHeaderRequest(encodeURI(`https://www.wordreference.com/es/en/translation.asp?spen=${word}`), (err, res, body) => {
    if (body) {
      //console.log(options.url);
      //console.log(body);
      const $ = cheerio.load(body);
      const adr = "https://www.wordreference.com" + $("source").get(accents[accent]).attribs.src
      console.log(word, adr)
      if (adr) {
        exec(`curl -A chromium -sfo ${f} --create-dirs ${adr} -H 'user-agent: ${options.headers['user-agent']}'`,play);
      }
    }
  })
} else {
  play();
}
