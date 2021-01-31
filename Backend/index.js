'use strict';;

var insertion = true;

const url = 'https://stream.wikimedia.org/v2/stream/page-create,page-delete,page-undelete,page-move,page-properties-change';


var EventSource = require('eventsource');

var path = require('path');
const http = require('http');
var express = require('express');
const cors = require("cors");
var app = express();

var fs = require('fs');

var request = require('request');


app.use(express.static('public')); 
app.use(express.json());
app.use(cors());



//========================= Access Data and Insert IN file =======
var eventSource = new EventSource(url);

eventSource.onopen = function(event) {
  console.log('--- Opened connection.');
};

eventSource.onerror = function(event) {
  console.error('--- Encountered error', event);
};

eventSource.onmessage = function(event) {
  fs.appendFileSync("storedData.json", ','+event.data);
};
//================================================================

app.get('/', (req, res) => {
  const data = (fs.readFileSync('./storedData.json', 'utf8')).substring(1);
  fs.writeFile('storedData.json', '', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  res.header("Content-Type",'application/json');
  res.send("["+data+"]");
});


const port = process.env.PORT || 4000;

app.listen(port,()=>{
  console.log("Listening to port: "+port);
});
