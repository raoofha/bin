#!/usr/bin/env node

const cheerio = require("cheerio")
const request = require('request')
const fs = require('fs')
const exec = require('child_process').exec

const accent = process.argv[2]
const word = process.argv[3]
const fdir = `/opt/dict/cambridge`
const f = `${fdir}/${accent}/${word}.mp3`

const play = (err) => {
  if (err) console.log(f, err)
  exec(`mplayer -volume 40 ${f}`);
}

if (!fs.existsSync(f)) {
  request(encodeURI(`https://dictionary.cambridge.org/pronunciation/english/${word}`), (err, res, body) => {
    if (body) {
      const $ = cheerio.load(body);
      //const adr = "https://dictionary.cambridge.org" + $(".us .audio_play_button").attr("data-src-mp3")
      //const adr_uk = "https://dictionary.cambridge.org" + $(".uk .audio_play_button").attr("data-src-mp3")
      const adr_uk = $(".pronunciation-item meta[itemprop=contentURL]").attr("content")
      const adr = $(".pronunciation-item meta[itemprop='contentURL']").eq(2).attr("content")
      console.log(adr_uk);
      console.log(adr);
      if (adr) {
        //let wrd = $(".headword .hw").first().text();
        let wrd = $("#page-content h1 b").text();
        if(!wrd){
          console.error("no text")
          wrd = word
        }
        const w = `${fdir}/us/${wrd}.mp3`
        const w_uk = `${fdir}/uk/${wrd}.mp3`
        const f_us = `${fdir}/us/${word}.mp3`
        const f_uk = `${fdir}/uk/${word}.mp3`
        exec(`curl -sfo ${w} --create-dirs ${adr}`,play);
        exec(`curl -sfo ${w_uk} --create-dirs ${adr_uk}`);
        console.log(w);
        console.log(w_uk);
        console.log(wrd, word);
        if(wrd !== word){
          exec(`ln -s ${w} ${f_us}`);
          exec(`ln -s ${w_uk} ${f_uk}`);
        }
      } else {
        console.error("ui changed")
      }
    } else {
      console.error("not found or can't connect")
    }
  })
} else {
  play();
}
