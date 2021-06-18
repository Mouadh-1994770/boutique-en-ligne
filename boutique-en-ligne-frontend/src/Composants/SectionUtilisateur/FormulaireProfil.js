import React, { useState } from "react";
import FormulaireConnexion from "./FormulaireConnexion";
import FormulaireInscription from "./FormulaireInscription";
import Button from "react-bootstrap/Button";

const FormulaireProfil = () => {
    const [connexion, setConnexion] = useState();
    const [deconnexion, setDeconnexion] = useState();

    const handleClick = (e) => {
        if (e.target.id === "enregistrer") {
            setConnexion(false);
            setDeconnexion(true);
        }
        else if (e.target.id === "connecter") {
            setConnexion(true);
            setDeconnexion(false);
        }
    };
    
    return (
        <>
            <Button className="m-2" onClick={handleClick}
                id="enregistrer"
                variant="outline-success" style={{fontWeight: "bold"}}>
                Créer un compte
            </Button>
            <Button className="m-2" onClick={handleClick}
                id="connecter"
                variant="outline-success" style={{fontWeight: "bold"}}>
                Se connecter
            </Button>
            {connexion && <FormulaireConnexion />}
            {deconnexion && <FormulaireInscription />}
        </>
    );
};

export default FormulaireProfil;