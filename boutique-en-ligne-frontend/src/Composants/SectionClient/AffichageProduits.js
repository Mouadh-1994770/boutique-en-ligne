
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
                <Col>
                    {produits.map((produit, index) => {
                        return (
                            <CardColumns>
                                <Card>
                                    <Card.Body key={index}>
                                        <Card.Title>{produit.nom}</Card.Title>
                                        <Card.Text> Description: {produit.description.substring(0, 50)}...</Card.Text>
                                        <Card.Text>Categorie: {produit.categorie}</Card.Text>
                                        <Card.Text>Prix:  {produit.prix}$</Card.Text>
                                        <Card.Text >{produit.rabais ? "Rabais:  " : ""} {produit.rabais ? produit.rabais + "%" : ""}</Card.Text>
                                        <Card.Text>{produit.rabais ? "nouveauPrix:  " : ""} {produit.rabais ? produit.prix - (produit.prix * produit.rabais / 100) + "$" : " "}</Card.Text>
                                        <Card.Text variant="danger">Quantite: {produit.quantite}</Card.Text>
                                        <Card.Text> {produit.quantite > 0 ?
                                            <Button onClick={() => AjouterProduitAuPanier(produit, index)}>Ajouter produit au panier</Button> :
                                            <Alert variant="danger">produit en rupture</Alert>}
                                        </Card.Text>

                                    </Card.Body>
                                </Card>
                            </CardColumns>
                        )
                    })
                    }
                </Col>
            </Row>
        </Container>
    )
} export default AffichageProduits;