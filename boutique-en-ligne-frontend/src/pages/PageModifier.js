import React from 'react';
import FormulaireModifierProduit from '../composants/FormulaireModifierProduit';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function PageModifier({ match }) {
    const id = match.params.id;
    return (
        <>
            <h1>Modifier</h1>
            <FormulaireModifierProduit id={id} />
            <Link to="/admin">
                <Button variant={'danger'} >Annuler</Button>
            </Link>
        </>
    );
}

export default PageModifier;