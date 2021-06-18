import React from 'react'
import { useState, useEffect } from 'react';
import ListeDesProduits from './ProduitsParCategorie';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
function pageClient() {
    const [listeproduits, setProduits] = useState([]);
    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/produitsClient`);
            var body = await resultat.json().catch((error) => { console.log(error) });
            setProduits(body);
        };
        chercherDonnees();
    }, []);
    const listeCategories = [...new Set(listeproduits.map(produit => produit.categorie))];
    return (
        <Container>
            <Row>
                <ListeDesProduits produits={listeproduits} Categories={listeCategories} />
            </Row>
        </Container>
    )
} export default pageClient;
