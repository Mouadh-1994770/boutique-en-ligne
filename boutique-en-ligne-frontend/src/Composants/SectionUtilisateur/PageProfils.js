import React, { useState } from "react";
import PageConnexion from "./PageConnexion";
import PageInscription from "./PageInscription";
import Button from "react-bootstrap/Button";

const PageProfil = () => {
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
            {connexion && <PageConnexion />}
            {deconnexion && <PageInscription />}
        </>
    );
};

export default PageProfil;