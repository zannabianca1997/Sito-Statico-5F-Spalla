'use strict';

var colors  = require('colors');
var express = require('express');
var request = require('request');

var app = express();

request('http://jsonplaceholder.typicode.com/photos', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body)
  }
});

app.set('view engine', 'jade');
app.set('views', './views');


app.get('/', function(req, res){
    res.render('home', {title:"home"});
})

app.get('/studente', function(req, res) {
    res.render('student', {title:"studente"});
})

app.get('/gruppo/:id', function(req, res) {
    

    res.render('group', {
        title: "gruppo",
        url: "http://placehold.it/600/92c952",
        groupId: req.params.id
    });
})

/*app.listen(8000, function(){
    console.log("Sono partito, puoi guardare la pagina all'indirizzo localhost:8000");
});


var http = require('http');
http.get('http://jsonplaceholder.typicode.com/posts', function (response) {
    var body = '';

    response.on('data', function(data) {
        body += data;
    });

    response.on('end', function() {
        var json = JSON.parse(body);    
    });
});
*/