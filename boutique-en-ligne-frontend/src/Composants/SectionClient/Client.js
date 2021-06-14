import React from 'react'
import { useState, useEffect } from 'react';
import ListeDesProduits from '../Composants/ListeDesProduits';
import Container from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
function Client() {
    const [listeproduits, setProduits] = useState([]);
    useEffect(() => {
        const chercherDonnees = async () => {
            setChargement(true);
            const resultat = await fetch(`/api/produitsClient`);
            var body = await resultat.json().catch((error) => { console.log(error) });
            setProduits(body);
            setChargement(false)
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
} export default Client;
