import React from 'react'
import { useState, useEffect } from 'react';
import ListeDesProduits from './ListeDesProduits';
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
    return (
        <Container>
            <Row>
                <ListeDesProduits produits={listeproduits} charge={chargement} />
            </Row>
        </Container>
    )
} export default pageClient;
