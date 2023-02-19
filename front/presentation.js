// Définir fonction ouverture de la boite à onglet
function open_module(event, module) {
    // Définir les variables nécessaires pour définir les modules et bouton lien 
    let i, tabcontent, tablinks;
    // Récuperer les modules et leur contenu via leur classe
    tabcontent = document.getElementsByClassName("tab_content");
    // Boucler sur leur longueur et les définir sur dysplay none pour ne pas les afficher par défault
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Récuperer les boutons lien de la nav via leur classe
    tablinks = document.getElementsByClassName("tab_links");
    // Boucler sur leur longueur et les définir sur display active pour qu'ils soient affichés au moment de l'evenement click 
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Définir le display des modules pour faciliter l'affichage et la mise en forme
    document.getElementById(module).style.display = "flex";
    document.getElementById(module).style.alignItems = "center";
    // Définir le display actuel comme actif pour la mise en forme css
    event.currentTarget.className += " active";
}