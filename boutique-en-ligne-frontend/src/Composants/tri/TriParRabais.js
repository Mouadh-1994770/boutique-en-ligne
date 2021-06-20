import React from 'react';
import AffichageTableau from '../AffichageTableau';

function TriParRabais({ produits, ordre }) {

    if (ordre === 'croissant') {

        produits.sort((a, b) => a.rabais - b.rabais);
    }

    else if (ordre === 'decroissant') {

        produits.reverse(produits.sort((a, b) => a.rabais - b.rabais));
    }

    return (
        <AffichageTableau produits={produits} />
    );
}

export default TriParRabais;