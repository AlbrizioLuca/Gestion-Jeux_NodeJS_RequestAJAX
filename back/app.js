// Déclarer constante qui contiendra l'export du module express
const express = require("express");
// Déclarer constante qui contiendra la fonction express qui crée l'appli
const app = express();
// Déclarer constante qui contiendra l'export du module fs
const fs = require("fs");
// Déclarer constante qui continedra l'export du module body parser
const bodyParser = require("body-parser");
// Pour le bon fonctionnement de l'appli on devra utiliser bodyParser
app.use(bodyParser.json());
// Déclarer constante qui contiendra l'export du module cors
const cors = require('cors');
// Pour le bon fonctionnement de l'appli on devra utiliser cors
app.use(cors());


// Déclarer constante pour définir la route qu' utilisera le controller 'gameboard'
const gameBoard = require("./src/routes/route_gameboard");
// Déclarer constante pour définir la route qu' utilisera le controller 'videogame'
const videoGame = require("./src/routes/route_videogame");


// TEST ROUTE PAR DEFAULT
app.get('/', (request,response) =>{
    response.send("Hello tout va bien!")
})

// Utiliser les routes liées au tableau 'gameboard' du fichier tableau.json
app.use(gameBoard)
// Utiliser les routes liées au tableau 'videogame' du fichier tableau.json
app.use(videoGame)


// On exporte la constante du port choisi
module.exports = app;