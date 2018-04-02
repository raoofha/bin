#!/usr/bin/env node

const jsdom = require("jsdom");
const request = require('request')
const fs = require('fs')
const exec = require('child_process').exec
const {
  JSDOM
} = jsdom;

const word = process.argv[2]
const fdir = `/opt/dict/wwwjdic`
const f = `${fdir}/${word}.mp3`

const play = () => {
  exec(`mplayer -volume 40 ${f}`);
}

if (!fs.existsSync(f)) {
  if (!word.match(/^[\u0000-\u007f]*$/)) {
    request.post({
      url: "http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1E",
      form: {
        dsrchkey: word,
        dicsel: 1
      }
    }, (err, res, body) => {
      if (body) {
        dom = new JSDOM(body)
        const el = dom.window.document.querySelector("label")
        var adr = el.querySelector("script")
        var wrd = el.querySelector("font")
        if (adr) {
          adr = decodeURI(adr.textContent)
          adr = adr.substring(0, adr.length - 3).substring(3)
        }
        if (wrd) {
          wrd = wrd.textContent
          wrd = wrd.substring(0, wrd.indexOf(" ")) || wrd
          wrd = wrd.substring(0, wrd.indexOf(";")) || wrd
          wrd = wrd.substring(0, wrd.indexOf("(")) || wrd
          wrd = wrd.substring(0, wrd.indexOf("【")) || wrd
        }
        //console.log(swf,wrd,el.getElementsByTagName("param").length)
        if (adr && wrd) {
          adr = "http://assets.languagepod101.com/dictionary/japanese/audiomp3.php?" + adr.replace("%26", "&")
          const w = `${fdir}/${wrd}.mp3`
          if( w === f){
            exec(`curl -sfo ${w} --create-dirs "${adr}"`, play);
          }
          //if (w !== f) {
            //exec(`ln -s ${w} ${f}`);
          //}
        }
      }
    })
  }
} else {
  play();
}
