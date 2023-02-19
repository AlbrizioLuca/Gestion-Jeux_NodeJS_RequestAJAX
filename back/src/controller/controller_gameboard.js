// Déclarer constante qui contiendra l'export du module fs
const fs = require("fs");

// Définir la fonction qui utilisera la méthode GET pour récupérer les éléments du tableau gameboard
exports.getDataGameBoard = (request, response) => {
    // Utiliser méthode readfile du module fs pour lire le fichier
    fs.readFile("./src/model/tableau.json", (err, data) => {
    // Condition si erreur
    if (err) {
        // Renvoi l'erreur status 500 et le message
        response.status(500).json({
            message: "Impossible de lire le fichier!",
            error: err,
        });
      // Sinon renvoi status 200, et les données en format json
    } else {
        response.status(200).json(JSON.parse(data).gameboard);
    }
    });
};

// Définir la fonction qui utilisera la méthode GET pour récupérer les éléments via leur id
exports.getDataById = (request, response) => {
    // Lecture du fichier carte.json
    fs.readFile("./src/model/tableau.json", (err, data) => {
    // Condition si erreur 500
        if (err) {
            // Renvoi l'erreur 500 avec un message
            response.status(500).json({
                message: "Impossible de lire le fichier !",
                error: err,
            });
            // Sinon
        } else {
            // Transforme la data en json manipulable
            const manipData = JSON.parse(data);
            // Recherche dans le fichier si l'id passée en parametre est présente dans le tableau
            const dataId = manipData.gameboard.find(
            (obj) => obj.id === parseInt(request.params.id)
            );
            // Si on trouve cet id
            if (dataId) {
                // Renvoi la reponse avec un status 200 et l'objet
                response.status(200).json(dataId);
            // sinon
            } else {
                // Renvoi la réponse avec un statut 404 et message d'erreur
                response.status(404).json({
                    message:"Vous devez faire erreur, aucun jeu ne correspond à cet id !",
                    error: err,
                });
            }
        }
    });
};

// Définir la fonction qui utilisera la méthode POST pour récupérer les éléments
exports.createData = (request, response) => {
    // Lecture du fichier
    fs.readFile("./src/model/tableau.json", (err, data) => {
        // Condition erreur 500
        if (err) {
            // Réponse status 500 avec un message et l'erreur
            response.status(500).json({
                message: "Impossible de lire le fichier !",
                error: err,
            });
            // sinon pas d'erreur
        } else {
            // Transforme la data en json manipulable
            const existingData = JSON.parse(data);
            // Définir la longueur du tableau boissons
            let arrayLength = existingData.gameboard.length;
            // Si le tableau n'est pas vide
            if (arrayLength > 1) {
                // Récupère le dernier objet du tableau boissons
                let lastObject = existingData.gameboard[arrayLength - 1];
                // Créer et insérer la new data avec l'id = à celle du dernier objet +1
                existingData.gameboard.push({
                    id: lastObject.id + 1,
                    name: request.body.name
                });
            // Sinon vu que le tableau est vide
            } else {
                // Créer et insérer la new data avec l'id = 1
                existingData.gameboard.push({
                    id: 1,
                    name: request.body.name
                });
            }
            // Réécrit le fichier stringify
            fs.writeFile("./src/model/tableau.json", JSON.stringify(existingData),(writeErr) => {
                // si erreur 500
                if (writeErr) {
                // renvoi erreur et message
                response.status(500).json({
                    message: "Impossible de créer une entrée pour ce jeu !",
                    error: err,
                });
                // sinon
                } else {
                    // status 200 avec un ti message
                    response.status(200).json({
                        message: "Ce jeu de plateau a bien été rajouté.",
                    });
                }
            });
        }
    });
};

// Définir la fonction qui utilisera la méthode PUT pour réecrire et du coup modifier des éléments
exports.updateData = (request, response) => {
    // Lecture du fichier
    fs.readFile("./src/model/tableau.json", (err, data) => {
        // Condition erreur de lecture (500)
        if (err) {
            // Afficher message et erreur
            response.status(500).json({
                message: "Impossible de lire le fichier!",
                error: err,
            });
            // Sinon
        } else {
            // Stocker les données existantes
            const existingData = JSON.parse(data);
            // Rechercher via l'id si parametre existant
            const dataId = existingData.gameboard.find(
                (obj) => obj.id === parseInt(request.params.id)
            );
            // condition si on trouve pas l'objet avec l'id
            if (!dataId) {
                // Reponse si on ne le trouve pas 404
                response.status(404).json({
                // Message erreur recherche
                    message:"Vous devez faire erreur, aucun jeu ne correspond à cet id !",
                    error: err,
                });
            // 'Sinon' on trouve l'objet donc ->
            } else {
                // La nouvelle donnée sera la requete executée dans le body thunder
                dataId.name = request.body.name;
                // Réécriture de la donnée et sauvegarde
                fs.writeFile("./src/model/tableau.json", JSON.stringify(existingData), (writeErr) => {
                    // Si érreur reponse 500 avec message
                    if (writeErr) {
                        response.status(500).json({
                        message: "Erreur survenue lors de la modification.",
                        error: err,
                        });
                    // sinon status 200 succes message
                    } else {
                        response.status(200).json({
                            message: "Ce jeu de plateau a bien été modifié !",
                        });
                    }
                });
            }
        }
    });
};

// Définir la fonction qui utilisera la méthode DELETE pour écraser et du coup supprimer un élément
exports.deleteData = (request, response) => {
    // Lecture du fichier
    fs.readFile("./src/model/tableau.json", (err, data) => {
        // Si erreur de lecture
        if (err) {
        // Erreur 500 + message
            response.status(500).json({
                message: "Impossible de lire le fichier !",
                error: err,
            });
        // Sinon
        } else {
            // Stocker la donnée existante
            const existingData = JSON.parse(data);
            // Chercher dans le fichier l'id correspondante
            const dataId = existingData.gameboard.find(
                (obj) => obj.id === parseInt(request.params.id)
            );
            // Si on ne trouve pas l'objet avec id
            if (!dataId) {
            // Erreur 404 + message
                response.status(404).json({
                    message:"Vous devez faire erreur, aucun jeu ne correspond à cet id !",
                    error: err,
                });
            // Sinon
            } else {
                // Reassigne la donnée existante avec le parametre nul pour écraser
                existingData.gameboard = existingData.gameboard.filter(
                    (obj) => obj.id != parseInt(request.params.id)
                );
                // Filtre la donnée et réecrit la variable sans celle ci
                fs.writeFile("./src/model/tableau.json", JSON.stringify(existingData), (writeErr) => {
                    if (writeErr) {
                        // Si erreur renvoi message 500 + error
                        response.status(500).json({
                            message: "Impossible de supprimer cet élément !",
                            error: err,
                        });
                    } else {
                        // Sinon status 200 + message
                        response.status(200).json({
                            message: "Ce jeu de plateau a bien été supprimé. !",
                        });
                    }
                });
            }
        }
    });
};