import React from 'react'
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Col'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react';
import AffichageProduits from './AffichageProduits'
function ProduitsParCategorie({ produits, Categories }) {
    const [listFilter, setListeFilter] = useState([])
    const [listeproduits, setProduits] = useState([]);
    const [tous, setTous] = useState(true)
    const [selectionnerProduits, setselectionnerProduits] = useState(false)
    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/produitsClient/${Categories}`);
            var body = await resultat.json().catch((error) => { console.log(error) });
            if (body !== undefined) {
            }
        };
        chercherDonnees();
    }, [Categories]);
    function CreerChekBox() {

        return (
            Categories.map(categorie => {
                return (
                    <Form.Check key={categorie} checked={listFilter.includes(categorie)}
                        onChange={(event) => {
                            if (event.target.checked) {
                                let liste = listFilter;
                                liste.push(categorie)
                                setListeFilter(liste);
                            } else {
                                if (listFilter.includes(categorie)) {
                                    const filterIndex = listFilter.indexOf(categorie);
                                    listFilter.splice(filterIndex, 1);
                                    setListeFilter(listFilter);
                                }
                            }
                            if (listFilter.length === 0) {
                                setTous(true);
                            }
                            else if (listFilter.length === Categories.length) {
                                setselectionnerProduits(true);
                                setTous(true);
                            } else {
                                setTous(false)
                                setselectionnerProduits(false);
                            }
                            let filtredlist = produits.filter(item =>
                                listFilter.includes(item.categorie)
                            );
                            setProduits(filtredlist);
                        }
                        }
                        type="checkbox"
                        label={categorie}
                    />
                )
            }
            ))
    }

    if (produits?.length) {

        return (
            <div>
                <Container>
                    <Row>
                        <Col xs="8">
                            {
                                tous ? <AffichageProduits produits={produits} /> : <AffichageProduits produits={listeproduits} />
                            }
                        </Col>
                        <Col xs="2">
                            <div>
                                <Form>
                                    <h5> Filtrer par catégories</h5>
                                    <Form.Group className="mb-3" >
                                        <Form.Check key="all" checked={selectionnerProduits}
                                            type="checkbox"
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    let copie = [];
                                                    setListeFilter([]);
                                                    Categories.map(x => {
                                                        copie.push(x);
                                                    });
                                                    setListeFilter(copie);
                                                    setTous(true)
                                                    setselectionnerProduits(true);
                                                }
                                                else {
                                                    setListeFilter([]);
                                                    setselectionnerProduits(false);
                                                }

                                            }}
                                            label="Tous les categories" />
                                        {
                                            CreerChekBox()
                                        }
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }
    else {
        return <Alert variant={"info"} >Aucun produit disponible</Alert>;
    }
} export default ProduitsParCategorie;

