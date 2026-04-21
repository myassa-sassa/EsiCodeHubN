function calculerPrix(quantite, prixUnitaire) {
    let tva = 0.20;
    let sousTotal = quantite * prixUnitaire;
    let total = sousTotal * (1 + tva);
    
    if (total > 100) {
        console.log("Réduction appliquée");
        total = total * 0.9;
    }
    
    return total;
}

function afficherResultat(prix) {
    console.log("Le prix total est : " + prix);
}

let quantite = 5;
let prix = 10;
let resultat = calculerPrix(quantite, prix);
afficherResultat(resultat);
