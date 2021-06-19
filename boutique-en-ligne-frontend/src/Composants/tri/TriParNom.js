import React from 'react';
import AffichageTableau from '../AffichageTableau';

function TriParNom({ produits, ordre }) {

  if (ordre === 'croissant') {
    produits.sort((a, b) => {
      if (a.nom < b.nom) {
        return -1;
      }
      if (a.nom > b.nom) {
        return 1;
      }
      return 0;

    }
    );
  }
  else if (ordre === 'decroissant') {
    produits.sort((a, b) => {
      if (a.nom < b.nom) {
        return 1;
      }
      if (a.nom > b.nom) {
        return -1;
      }
      return 0;
    }
    );
  }
  return (
    <AffichageTableau produits={produits} />
  );
}

export default TriParNom;