
import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import Container from 'react-bootstrap/Col'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
function AffichageProduits({ produits, nomClient }) {

    function AffichageProduits({ produits, nomClient }) {

        const [quantiteProduit, setQuantite] = useState(produits);
        const [ajout, setAjout] = useState(false);
        function AjouterProduitAuPanier(produit, index) {
            const EnvoyerProduit = async () => {
                var response = await fetch(`/api/panier/ajouter/${nomClient}`, {
                    method: 'post',
                    body: JSON.stringify({ produit }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                setAjout(true)
            }
            EnvoyerProduit()
            var nouvelleQuantite = quantiteProduit.slice();
            if (produit !== undefined) {
                if (nouvelleQuantite[index].quantite > 0) {
                    nouvelleQuantite[index].quantite -= 1;
                    setQuantite(nouvelleQuantite)
                }
            }
        }
    }
    return (
        <Container>
            <Row>

            </Row>
        </Container>
    )
} export default AffichageProduits;