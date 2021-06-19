import React from 'react';
import FormulaireAjouterProduit from '../Composants/FormulaireAjouterProduit';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function PageAjouter() {
    return (
        <>
            <h1>Ajouter un nouveau Produit</h1>
            <FormulaireAjouterProduit />
            <Link to="/admin">
                <Button variant={'danger'} >Annuler</Button>
            </Link>
        </>
    );
}

export default PageAjouter;