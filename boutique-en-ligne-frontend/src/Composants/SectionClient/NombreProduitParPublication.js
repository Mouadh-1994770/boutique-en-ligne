import React from 'react'

function NombreProduitParPublication(props) {
    return (
        <>
            <div className="col-md-4">Sélectionner le nombre des produits par page </div>
            <div>
                <select onChange={props.handleChange}>
                    <option selected="selected" label="5" value={12} />
                    <option label="10" value={24} />
                    <option label="12" value={48} />
                    <option label="tous" value={props.longueurList} />
                </select>
            </div> 
        </>
    )
}export default NombreProduitParPublication
