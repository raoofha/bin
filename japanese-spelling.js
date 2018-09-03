#!/usr/bin/env node

const wanakana = require("wanakana")
const kuroshiro = require("kuroshiro");

const word = process.argv[2]

console.log(`${wanakana.toRomaji(word)} (romaji)\n\n\n${wanakana.toHiragana(word)} (hiragana)\n\n\n${wanakana.toKatakana(word)} (katakana)`)
kuroshiro.init(function (err) {
  console.log(`${kuroshiro.convert(word, {to:"romaji"})} (romaji kuroshiro)\n\n\n${kuroshiro.convert(word, {to:"hiragana"})} (hiragana kuroshiro)\n\n\n${kuroshiro.convert(word, {to:"katakana"})} (katakana kuroshiro)`)
})
