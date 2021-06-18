import React from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import { Link } from 'react-router-dom';
import AffichageTableau from './AffichageTableau';

function Recherche({ produits, motRechercher }) {

  console.log(motRechercher);
  var resultatDeRecherche = produits.filter(p => p.nom.toLowerCase().indexOf(motRechercher) !== -1 || p.categorie.toLowerCase().indexOf(motRechercher) !== -1

    || p.description.toLowerCase().indexOf(motRechercher) !== -1);

  if (produits?.length) {

    return (
      <AffichageTableau produits={resultatDeRecherche} />
    );
  }

  else {
    return <Alert variant={"info"} >Désolé ! Il n'y a pas des produits à afficher </Alert>;
  }

}

export default Recherche;