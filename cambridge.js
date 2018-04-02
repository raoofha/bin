#!/usr/bin/env node

const cheerio = require("cheerio")
const request = require('request')
const fs = require('fs')
const exec = require('child_process').exec

const accent = process.argv[2]
const word = process.argv[3]
const fdir = `/opt/dict/cambridge/`
const f = `${fdir}/${accent}/${word}.mp3`

const play = () => {
  exec(`mplayer -volume 40 ${f}`);
}

if (!fs.existsSync(f)) {
  request(encodeURI(`http://dictionary.cambridge.org/dictionary/english/${word}`), (err, res, body) => {
    if (body) {
      const $ = cheerio.load(body);
      const adr = $(".audio_play_button.us").attr("data-src-mp3")
      const adr_uk = $(".audio_play_button.uk").attr("data-src-mp3")
      if (adr) {
        const wrd = $(".headword .hw").first().text();
        const w = `${fdir}/us/${wrd}.mp3`
        const w_uk = `${fdir}/uk/${wrd}.mp3`
        const f_uk = `${fdir}/uk/${word}.mp3`
        exec(`curl -sfo ${w} --create-dirs ${adr}`,play);
        exec(`curl -sfo ${w_uk} --create-dirs ${adr_uk}`);
        if(w !== f){
          exec(`ln -s ${w} ${f}`);
          exec(`ln -s ${w_uk} ${f_uk}`);
        }
      }
    }
  })
} else {
  play();
}
