// Déclarer constante qui contiendra l'export du module express
const express = require("express");
// Déclarer constante qui définit quelle route doit emprunter express
const router = express.Router();
// Déclarer constante qui définit le chemin vers le fichier où se trouve les fonctions / tableau
const manageVideoGame = require("../controller/controller_videogame");


// Route methode post
router.post("/videogame", manageVideoGame.createData);

// Route que doit récupérer la méthode GET vers le fichier carte.json
router.get('/videogame', manageVideoGame.getDataVideoGame);

// Route que doit récuperer la méthode GET et récupérer la donnée via son id
router.get("/videogame/:id", manageVideoGame.getDataById);

// Route que va récupérer la méthode PUT et mettre à jour le fichier
router.put("/videogame/:id", manageVideoGame.updateData);

// Route que va recuperer la méthode DELETE pour écraaser et supprimer la donnée
router.delete("/videogame/:id", manageVideoGame.deleteData);


module.exports = router;