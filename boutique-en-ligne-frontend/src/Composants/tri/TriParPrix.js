import React from 'react';
import AffichageTableau from '../AffichageTableau';

function TriParPrix({ produits, ordre }) {

    if (ordre === 'croissant') {

        produits.sort((a, b) => a.prix - b.prix);
    }

    else if (ordre === 'decroissant') {

        produits.reverse(produits.sort((a, b) => a.prix - b.prix));
    }

    return (
        <AffichageTableau produits={produits} />
    );
}

export default TriParPrix;