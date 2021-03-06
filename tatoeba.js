#!/usr/bin/env node

const cheerio = require("cheerio")
const request = require('request')
const fs = require('fs')
const exec = require('child_process').exec

const word = process.argv[2]
const lang = process.argv[3] || "eng"
const langT = process.argv[4] || "eng"

request(encodeURI(`https://tatoeba.org/eng/sentences/search?query=${word}&from=${lang}&to=${langT}`), (err, res, body) => {
  if (body) {
    const $ = cheerio.load(body);
    $(".section md-icon").remove()
    $(".section md-button").each(function (i, el){
      let lname = $(this).attr("href")
      let l = lname.substring(lname.lastIndexOf("/"))
      $(this).parent().before(`<div><a href="https://audio.tatoeba.org/sentences/${langT}/${l}.mp3">${langT}</a>${$(this).parent().text()}</div>`)
      $(this).parent().remove()
    })
    $(".section .lang").remove()
    $(".section h2").remove()
    $(".section .paging").remove()
    $(".section md-subheader").remove()
    $(".section md-button").remove()
    console.log($(".section").html());
  } else {
    console.error("not found or can't connect")
  }
})
