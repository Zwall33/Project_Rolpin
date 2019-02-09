var net = require('net');
var mysql = require('mysql');
var data;
var time = 0;
var capteur_init;
var data_capteur;
var data_pompe;
var data_pompe_vitesse;
var humi;
var lum;
var fert;
var tempe;
var values_capteur;
var pompe1;
var pompe2;
var pompe3;
var pompe4;
var v_pompe1;
var v_pompe2;
var v_pompe3;
var v_pompe4;
var values_pompe;
var sql;


//installer express dans le dossier du nodejs avec tout les fichiers
var express = require('express');
var app = express();
app.listen(3000);
app.setMaxListeners(20);

function getRandomArbitrary() {
  tempe = Math.floor(Math.random() * 100);
  humi = Math.floor(Math.random() * 100);
  lum = Math.floor(Math.random() * 100);
  fert = Math.floor(Math.random() * 100);
}

function getRandomArbitraryV() {
  v_pompe1 = Math.floor(Math.random() * 4)+1;
  v_pompe2 = Math.floor(Math.random() * 4)+1;
  v_pompe3 = Math.floor(Math.random() * 4)+1;
  v_pompe4 = Math.floor(Math.random() * 4)+1;
}

function getRandomArbitraryP(){
	pompe1 = Math.random();
	pompe2 = Math.random();
	pompe3 = Math.random();
	pompe4 = Math.random();
}

var con = mysql.createConnection({
	host: "127.0.0.1",
	port: "3306",
	user: "root",
	password: "",
	database:"Jardin_PTUT"
});

con.connect(function(err){
	if (err) throw err;
	console.log("Connected!");
});

setInterval(function(){
	time = 0;
	time = new Date(Date.now()).toLocaleString();
	
		getRandomArbitrary();
		values_capteur = [time, tempe, humi, lum, fert];
		sql = "INSERT INTO Capteur VALUES (?)";
		con.query(sql,[values_capteur], function(err,result){
			if (err) throw err;
			console.log("Row created"); 
		});
	
		getRandomArbitraryP();
		getRandomArbitraryV();
		values_pompe = [time, pompe1, v_pompe1, pompe2, v_pompe2,pompe3, v_pompe3, pompe4, v_pompe4];
		sql = "INSERT INTO Pompe VALUES (?)";
		con.query(sql,[values_pompe], function(err,result){
			if (err) throw err;
			console.log("Row created"); 			
		});
	
	
	
		con.query("SELECT Temperature, Humidite, Luminosite, Fertilite FROM Capteur WHERE Heure = (?)",time, function(err,result){
			if (err) throw err;
				data_capteur = result;
				console.log(data_capteur);				
		});
		con.query("SELECT Pompe1, Pompe2, Pompe3, Pompe4 FROM Pompe WHERE Heure = (?)",time, function(err,result){
			if (err) throw err;
				data_pompe = result;
				console.log(data_pompe);				
		});	
		con.query("SELECT vit_pompe1, vit_pompe2, vit_pompe3, vit_pompe4 FROM Pompe WHERE Heure = (?)",time, function(err,result){
			if (err) throw err;
				data_pompe_vitesse = result;
				console.log(data_pompe_vitesse);				
		});

		con.query("SELECT Temperature,Humidite,Luminosite,Fertilite FROM Capteur ORDER BY Heure DESC LIMIT 10", function(err,result){
			if (err) throw err;
			capteur_init = result;
		});

		app.get('/data_init',function(req, res){  //envoie getter à html
			res.send(capteur_init);
		});

		app.get('/data_capteur',function(req, res){  //envoie getter à html
			res.send(data_capteur);
		});

		app.get('/data_pompe',function(req, res){  //envoie getter à html
			res.send(data_pompe);
		});

		app.get('/data_pompe_vitesse',function(req, res){  //envoie getter à html
			res.send(data_pompe_vitesse);
		});
	
},5*1000);