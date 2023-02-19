// Déclarer constante qui contiendra l'export du module express
const express = require("express");
// Déclarer constante qui définit quelle route doit emprunter express
const router = express.Router();
// Déclarer constante qui définit le chemin vers le fichier où se trouve les fonctions / tableau
const manageGameBoard = require("../controller/controller_gameboard");


// Route methode post
router.post("/gameboard", manageGameBoard.createData);

// Route que doit récupérer la méthode GET vers le fichier carte.json
router.get('/gameboard', manageGameBoard.getDataGameBoard);

// Route que doit récuperer la méthode GET et récupérer la donnée via son id
router.get("/gameboard/:id", manageGameBoard.getDataById);

// Route que va récupérer la méthode PUT et mettre à jour le fichier
router.put("/gameboard/:id", manageGameBoard.updateData);

// Route que va recuperer la méthode DELETE pour écraaser et supprimer la donnée
router.delete("/gameboard/:id", manageGameBoard.deleteData);


module.exports = router;