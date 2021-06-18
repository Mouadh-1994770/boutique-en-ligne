import React from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function AffichageTableau({ produits }) {

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Categorie</th>
                        <th>Prix</th>
                        <th>Rabais</th>
                        <th>Quantité Disponible</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        produits.map(produit => {
                            return (
                                <>
                                    <tr>
                                        <td> {produit.nom} </td>
                                        <td> {produit.description}</td>
                                        <td> {produit.categorie}</td>
                                        <td> {produit.prix}</td>
                                        <td> {produit.rabais}</td>
                                        <td> {produit.quantite}</td>
                                        <td> <Link to={`/modifier/${produit._id}`}>
                                            <Button variant="success" className="m-1" size="sm" >Modifier</Button>
                                        </Link>
                                        </td>
                                        <td>
                                            <Link to={`/supprimer/${produit._id}`}>
                                                <Button variant="danger" className="m-1" size="sm" >Supprimer</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    );
}

export default AffichageTableau;