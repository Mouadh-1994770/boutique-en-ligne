import React from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import AffichageTableau from '../AffichageTableau';

function TriParQuantite({ produits, ordre }) {

    if (ordre === 'croissant') {

        produits.sort((a, b) => a.quantite - b.quantite);
    }

    else if (ordre === 'decroissant') {

        produits.reverse(produits.sort((a, b) => a.quantite - b.quantite));
    }

    return (
        <AffichageTableau produits={produits} />

    );
}

export default TriParQuantite;