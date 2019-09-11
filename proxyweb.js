const express = require("express");
const request = require('request');

const app = express()
app.get('/*', function(req,res) {
  request(req.params[0]).pipe(res);
});

app.listen(3000);
