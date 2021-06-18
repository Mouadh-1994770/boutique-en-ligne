import React from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
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