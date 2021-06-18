import React from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import AffichageTableau from '../AffichageTableau';

function TriParDescription({ produits, ordre }) {
       
    if (ordre === 'croissant') {
        
        produits.sort((a, b) => 
        
        {
        
            if (a.description.substring(0,4) < b.description.substring(0,4)) {
                return -1;
              }
              if (a.description.substring(0,4) > b.description.substring(0,4)) {
                return 1;
              }
              return 0;
        
        }
        
        );
    }

    else if (ordre === 'decroissant') {

        produits.sort((a, b) => 
        
        {
        
            if (a.description.substring(0,4) < b.description.substring(0,4)) {
                return 1;
              }
              if (a.description.substring(0,4) > b.description.substring(0,4)) {
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

export default TriParDescription;