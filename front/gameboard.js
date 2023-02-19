$(document).ready(() => {
    const apiBaseUrl = "http://localhost:3000/"

    function displayGameBoard(result) {
        // Définir variable pour récupérer élément par son id 
        let target = document.getElementById("target-gameboard")
        // Récupérer et vérifier le nombre d'éléments enfants
        let numb = target.childElementCount;
        // Si il y a des élements enfants alors supprimer la balise <ul>
        if (numb > 0) {
            target.removeChild(target.firstElementChild)
        }
        // Définir variable qui va créer la balise <ul>
        let list = document.createElement("ul")
        // Boucler sur result et créer li à chaque iteration
        for (let i = 0; i < result.length; i++) {
            let element = document.createElement("li");
            // Accrocher les éléménts liste à la balise <ul>
            list.appendChild(element); 
            // Intégrer au fichier HTML les id et nom des objets 
            element.innerHTML = `${result[i]["id"]} - ${result[i]["name"]}`;
        }
        // Accrocher la balise <ul> à la div définit plus haut par son id 
        target.appendChild(list);
    }

    
    
    // Définir la fonction qui utilisera la méthode POST
    function addGameBoard() {
        // Définir la variable qui va récupérer la saisie de l'input 
        const name = {name: $("#name-gameboard").val()};
        // Définir la requete AJAX 
        $.ajax({
            type: "POST",
            url: apiBaseUrl + 'gameboard',
            data: JSON.stringify(name),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            // En cas de succés afficher message et activer la fonction pour afficher en HTML
            success:(result) => {
                console.log(result);
                alert("Le jeu a bien été ajouté !");
                getAllGameBoard();
            },
            // En cas d'erreur affiche tous les status et message d'erreur
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: " + status + " error: " + error)
            }
        })
    }   
    
    // Définir la fonction qui utilisera la méthode GET pour récupérer la totalité du tableau
    function getAllGameBoard() {
        // Définir la requete AJAX 
        $.ajax({
            type: "GET",
            url: apiBaseUrl + 'gameboard',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            // En cas de succés afficher message et activer la fonction pour afficher en HTML
            success:(result) => {
                console.log(result);
                displayGameBoard(result);
            },
            // En cas d'erreur affiche tous les status et message d'erreur
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("status: " + status + " error: " + error)
            }
        })
    }

    // Définir la fonction qui utilisera la méthode GET pour récupérer une donnée ciblée par son ID
    function getGameBoardById() {
        // Définir la variable qui va récupérer la saisie de l'input 
        const id = $("#id-gameboard").val();
        // Définir la requete AJAX 
        $.ajax({
            type: "GET",
            url: apiBaseUrl + 'gameboard/' + id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            // En cas de succés afficher message et activer la fonction pour afficher en HTML
            success:(result) => {
                console.log(result);
                alert("Voici le jeu demandé");
                displayGameBoard([result]);
            },
            // En cas d'erreur affiche tous les status et message d'erreur
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("Aucun jeu n'a été trouvé avec cette ID!")
            }
        })
    }
    
    // Définir la fonction qui utilisera la méthode PUT pour mettre à jour une donnée ciblée par son ID
    function updateGameBoard() {
        // Définir les variables qui vont récupérer les saisies des inputs 
        const id = $("#new-id-gameboard").val();
        const name = {name:$("#new-name-gameboard").val()};
        // Définir la requete AJAX 
        $.ajax({
            type: "PUT",
            url: apiBaseUrl + 'gameboard/' + id,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(name),
            dataType: 'json',
            // En cas de succés afficher message et activer la fonction pour afficher en HTML
            success:(result) => {
                console.log(result);
                alert("Le jeu a bien été modifié !");
                getAllGameBoard();
            },
            // En cas d'erreur affiche tous les status et message d'erreur
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("Aucun jeu n'a été trouvé avec cette ID!")
            }
        })
    }

    // Définir la fonction qui utilisera la méthode DELETE pour supprimer une donnée ciblée par son ID
    function deleteGameBoard() {
        // Définir la variable qui va récupérer la saisie de l'input 
        const id = $("#index-gameboard").val();
        // Définir la requete AJAX 
        $.ajax({
            type: "DELETE",
            url: apiBaseUrl + 'gameboard/' + id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            // En cas de succés afficher message et activer la fonction pour afficher en HTML
            success:(result) => {
                console.log(result);
                alert("Le jeu a bien été supprimé !");
                getAllGameBoard();
            },
            // En cas d'erreur affiche tous les status et message d'erreur
            error: (xhr, status, error) => {
                console.log(xhr);
                console.log(status);
                console.log(error);
                alert("Aucun jeu n'a été trouvé avec cette ID!")
            }
        })
    }

    $("#add-gameboard").click(addGameBoard) 
    $("#show-gameboard").click(getAllGameBoard) 
    $("#find-gameboard").click(getGameBoardById) 
    $("#modify-gameboard").click(updateGameBoard) 
    $("#delete-gameboard").click(deleteGameBoard) 
})