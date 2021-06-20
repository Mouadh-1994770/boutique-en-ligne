
import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import Container from 'react-bootstrap/Col'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Pagination from './Pagination'
//import PageConnexion from '../SectionUtilisateur/PageConnexion';
import NombreProduitParPublication from './NombreProduitParPublication'
function AffichageProduits({ produits}) {  
    const [page, setPage] = useState(5);
    const [pageCourant, setPageCourant] = useState(1);
    const [quantiteProduit, setQuantite] = useState(produits);
    const dernierPage = pageCourant * page;
    const premierPage = dernierPage - page;
    const publicationCourant = produits.slice(premierPage, dernierPage)
    const longueurList = produits.length;
    const publication = (numeoPage) => setPageCourant(numeoPage)
    
    function AjouterProduitAuPanier(produit, index) {
        const EnvoyerProduit = async () => {
            await fetch(`/api/panier/ajouter/${"Alain"}`, {
                method: 'post',
                body: JSON.stringify({ produit }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        alert("le produit est bien ajouté au panier")
                    }
                    else {
                        alert("Le produit n'a pas été ajoutée")
                    }
                })
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
    const handleChange = (e) => {
        setPage(e.target.value)
    }
    return (
        <Container>
             <Row>
            <Alert variant={"primary"} className="mt-3"> <h1>Voir nos produits</h1> </Alert>
            <NombreProduitParPublication handleChange={handleChange} longueurList={longueurList} />
            </Row>
            <Row>
                <Col>
                    {publicationCourant.map((produit, index) => {
                        return (
                            <CardColumns key="index">
                                <Card>
                                    <Card.Body key={index}>
                                        <Card.Title>{produit.nom}</Card.Title>
                                        <Card.Text> Description: {produit.description.substring(0, 50)}...</Card.Text>
                                        <Card.Text>Categorie: {produit.categorie}</Card.Text>
                                        <Card.Text>Prix:  {produit.prix}$</Card.Text>
                                        <Card.Text className="text-danger">{produit.rabais ? "Rabais:  " : ""} {produit.rabais ? produit.rabais + "%" : ""}</Card.Text>
                                        <Card.Text className="text-danger">{produit.rabais ? "nouveauPrix:  " : ""} {produit.rabais ? produit.prix - (produit.prix * produit.rabais / 100) + "$" : " "}</Card.Text>
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
            <Row>
                <Col>
                    <Pagination pagePublier={page} totalPublication={longueurList} publication={publication} />
                </Col>
            </Row>
        </Container>
    )
} export default AffichageProduits;