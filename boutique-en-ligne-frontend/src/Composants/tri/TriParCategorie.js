import React from 'react';
import AffichageTableau from '../AffichageTableau';

function TriParCategorie({ produits, ordre }) {

  if (ordre === 'croissant') {
    produits.sort((a, b) => {
      if (a.categorie < b.categorie) {
        return -1;
      }
      if (a.categorie > b.categorie) {
        return 1;
      }
      return 0;
    }
    );
  }

  else if (ordre === 'decroissant') {
    produits.sort((a, b) => {
      if (a.categorie < b.categorie) {
        return 1;
      }
      if (a.categorie > b.categorie) {
        return -1;
      }
      return 0;
    }
    );
  }

  return (

    <AffichageTableau produits={produits} />

  )

}

export default TriParCategorie;