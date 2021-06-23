import React from 'react'
import { useTranslation } from 'react-i18next';
function NombreProduitParPublication(props) {
    const { t } = useTranslation();
    return (
        <>
            <div className="col-md-4">{t("selectionnerlenombredesproduitsparpage")} </div>
            <div>
                <select onChange={props.handleChange}>
                    <option label="12" value={12} />
                    <option label="24" value={24} />
                    <option label="48" value={48} />
                    <option label={t("tous")} value={props.longueurList} />
                </select>
            </div> 
        </>
    )
}export default NombreProduitParPublication
