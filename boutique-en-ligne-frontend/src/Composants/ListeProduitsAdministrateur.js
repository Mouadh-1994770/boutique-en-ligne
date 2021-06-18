import {
    React,
    useState,
    useEffect
} from 'react';

import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Nav, NavDropdown, FormControl, Form, Navbar, Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TriParCategorie from './Tri/TriParCategorie';
import TriParNom from './Tri/TriParNom';
import TriParPrix from './Tri/TriParPrix';
import TriParRabais from './Tri/TriParRabais';
import TriParQuantite from './Tri/TriParQuantite';
import TriParDescription from './Tri/TriParDescription';
import Recherche from './Recherche';


function ListeProduitsAdministrateur({ produits, tri, motRechercher }) {
    var ordre;

    if (produits?.length) {

        switch (tri) {
            case "categorieOrdreCroissant":
                ordre = 'croissant';
                return (
                    <>
                        <TriParCategorie produits={produits} ordre={ordre} />
                    </>
                );
                break;

            case "categorieOrdreDecroissant":
                ordre = 'decroissant';
                return (
                    <>
                        <TriParCategorie produits={produits} ordre={ordre} />
                    </>
                );
                break;

            case "nomOrdreCroissant":
                ordre = 'croissant';
                return (
                    <>
                        <TriParNom produits={produits} ordre={ordre} />
                    </>
                );
                break;

            case "nomOrdreDecroissant":
                ordre = 'decroissant';
                return (
                    <>
                        <TriParNom produits={produits} ordre={ordre} />
                    </>
                );
                break;

            case "prixOrdreCroissant":
                ordre = 'croissant';
                return (
                    <>
                        <TriParPrix produits={produits} ordre={ordre} />
                    </>
                );
                break;

            case "prixOrdreDecroissant":
                ordre = 'decroissant';
                return (
                    <>
                        <TriParPrix produits={produits} ordre={ordre} />
                    </>
                );
                break;

            case "rabaisOrdreCroissant":
                ordre = 'croissant';
                return (
                    <>
                        <TriParRabais produits={produits} ordre={ordre} />
                    </>
                );
                break;

            case "rabaisOrdreDecroissant":
                ordre = 'decroissant';
                return (
                    <>
                        <TriParRabais produits={produits} ordre={ordre} />
                    </>
                );
                break;

            case "quantiteOrdreCroissant":
                ordre = 'croissant';
                return (
                    <>
                        <TriParQuantite produits={produits} ordre={ordre} />
                    </>
                );
                break;

            case "quantiteOrdreDecroissant":
                ordre = 'decroissant';
                return (
                    <>
                        <TriParQuantite produits={produits} ordre={ordre} />
                    </>
                );
                break;

            case "descriptionOrdreCroissant":
                ordre = 'croissant';
                return (
                    <>
                        <TriParDescription produits={produits} ordre={ordre} />
                    </>
                );
                break;

            case "descriptionOrdreDecroissant":
                ordre = 'decroissant';
                return (
                    <>
                        <TriParDescription produits={produits} ordre={ordre} />
                    </>
                );
                break;

            case "recherche":

                return (
                    <>
                        <Recherche produits={produits} motRechercher={motRechercher} />
                    </>
                );
                break;
        }
    }

    else {
        return <Alert variant={"info"} >Désolé ! Il n'y a pas des produits à afficher </Alert>;
    }
}

export default ListeProduitsAdministrateur;