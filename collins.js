#!/usr/bin/env node

const cheerio = require("cheerio")
const request = require('request')
const fs = require('fs')
const exec = require('child_process').exec

const lang = process.argv[2]
const word = process.argv[3]
const fdir = `/opt/dict/collins/${lang}`
const f = `${fdir}/${word}.mp3`

const play = () => {
  exec(`mplayer -volume 40 ${f}`);
}

if (!fs.existsSync(f)) {
  var customHeaderRequest = request.defaults({
      headers: {'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36"}
  });
    
  //request(encodeURI(`https://www.collinsdictionary.com/dictionary/${lang}/${word}`), (err, res, body) => {
  customHeaderRequest(encodeURI(`https://www.collinsdictionary.com/dictionary/${lang}/${word}`), (err, res, body) => {
    //console.log(err, res.statusCode, body.length)
    //if (res && res.statusCode == 200) {
    if (body) {
      const $ = cheerio.load(body);
      //const adr = $(".content-box-header .audio_play_button").attr("data-src-mp3")
      //const w = escape(`${fdir}/${$(".content-box-header h2").first().text()}.mp3`)

      const adr = $(".hwd_sound.sound.audio_play_button.icon-volume-up.ptr.fa.fa-volume-up").attr("data-src-mp3");
      const w = escape(`${fdir}/${$(".cB.cB-def.dictionary.biling .orth").text()}.mp3`)
      console.log(adr, w)
      if (adr) {
        //exec(`curl -sfo ${f} --create-dirs ${adr}`,play);
        exec(`curl -sfo ${w} --create-dirs ${adr}`,play);
        if(w !== f){
          exec(`ln -s ${w} ${f}`);
        }
      }
    }
  })
} else {
  play();
}
