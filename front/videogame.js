$(document).ready(() => {
    const apiBaseUrl = "http://localhost:3000/"

    function displayVideoGame(result) {
        // Définir variable pour récupérer élément par son id 
        let target = document.getElementById("target-videogame")
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
    function addVideoGame() {
        // Définir la variable qui va récupérer la saisie de l'input 
        const name = {name: $("#name-videogame").val()};
        // Définir la requete AJAX 
        $.ajax({
            type: "POST",
            url: apiBaseUrl + 'videogame',
            data: JSON.stringify(name),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            // En cas de succés afficher message et activer la fonction pour afficher en HTML
            success:(result) => {
                console.log(result);
                alert("Le jeu a bien été ajouté !");
                getAllVideoGame();
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
    
    // Définir la fonction qui utilisera la méthode GET pour récuperer le tableau 
    function getAllVideoGame() {
        // Définir la requete AJAX 
        $.ajax({
            type: "GET",
            url: apiBaseUrl + 'videogame',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            // En cas de succés afficher message et activer la fonction pour afficher en HTML
            success:(result) => {
                console.log(result);
                displayVideoGame(result);
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
    
    // Définir la fonction qui utilisera la méthode GET qui récupèrera la donnée ciblé par son id
    function getVideoGameById() {
        // Définir la variable qui va récupérer la saisie de l'input 
        const id = $("#id-videogame").val();
        // Définir la requete AJAX 
        $.ajax({
            type: "GET",
            url: apiBaseUrl + 'videogame/' + id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            // En cas de succés afficher message et activer la fonction pour afficher en HTML
            success:(result) => {
                console.log(result);
                alert("Voici le jeu demandé");
                displayVideoGame([result]);
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
    
    // Définir la fonction qui utilisera la méthode PUT pour mettre à jour la donnée ciblé par son id
    function updateVideoGame() {
        // Définir les variables qui vont récupérer les saisies des inputs 
        const id = $("#new-id-videogame").val();
        const name = {name: $("#new-name-videogame").val()};
        // Définir la requete AJAX 
        $.ajax({
            type: "PUT",
            url: apiBaseUrl + 'videogame/' + id,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(name),
            dataType: 'json',
            // En cas de succés afficher message et activer la fonction pour afficher en HTML
            success:(result) => {
                console.log(result);
                alert("Le jeu a bien été modifié !");
                getAllVideoGame();
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
    
    // Définir la fonction qui utilisera la méthode DELETE pour supprimer
    function deleteVideoGame() {
        // Définir la variable qui va récupérer la saisie de l'input 
        const id = $("#index-videogame").val();
        // Définir la requete AJAX 
        $.ajax({
            type: "DELETE",
            url: apiBaseUrl + 'videogame/' + id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            // En cas de succés afficher message et activer la fonction pour afficher en HTML
            success:(result) => {
                console.log(result);
                alert("Le jeu a bien été supprimé !");
                getAllVideoGame();
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

    $("#add-videogame").click(addVideoGame) 
    $("#show-videogame").click(getAllVideoGame) 
    $("#find-videogame").click(getVideoGameById) 
    $("#modify-videogame").click(updateVideoGame) 
    $("#delete-videogame").click(deleteVideoGame) 
})