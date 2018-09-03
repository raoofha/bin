#! /usr/bin/env node

console.log(`
<script src='https://code.responsivevoice.org/responsivevoice.js'></script>
<button id="speakBtn" type='button'>
<img src="qrcx://localhost/icons/playsound.png" border="0" alt="Play">
${process.argv[3]}
</button>
<script>
let $clicked = document.getElementById("clicked")
//speakBtn.addEventListener("click", ()=> responsiveVoice.speak("${process.argv[3]}", "${process.argv[2]}"));
document.getElementById("speakBtn").addEventListener("click", ()=> {
  responsiveVoice.speak("${process.argv[3]}", "${process.argv[2]}", {volume: 0.3})
});
</script>
  `)
