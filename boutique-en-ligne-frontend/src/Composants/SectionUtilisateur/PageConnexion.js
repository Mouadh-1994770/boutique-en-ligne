import React, { useEffect, useState } from "react";
import "./Page.css";
import PageValidation from "./PageValidation";
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom'


function PageConnexion({ error }) {
    const [values, setValues] = useState({nom: "", password: "" });
    const [errors, setErrors] = useState();
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [rediriger, setRediriger] = useState(false); 

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };
    const handlerFromSubmit = (event) => {
        event.preventDefault();
        let errors = PageValidation(values, true);
        setErrors(errors);
        setDataIsCorrect(!errors.hasError);
    }

    useEffect(()=>{
        if(dataIsCorrect){
            let utilisateur = {
                nom:values.nom, 
                password:values.password,       
            }
            verifierUtilisateur(utilisateur);
        }      
        setDataIsCorrect(false)

    }, [dataIsCorrect]);

    const verifierUtilisateur = async (utilisateur) => {
        const resultat = await fetch(`/api/utilisateur/existe${utilisateur.nom}/${utilisateur.password}`);
        setRediriger(true);    
    };

    function AfficherRedirection() {
        if(values.role ==="Admin" && rediriger === true){
            return <Redirect to="/Admin" />
        }
        else if(values.role ==="Client" && rediriger === true){
            return <Redirect to= "/Client"/>
        };
    }

    return (
        <>  {AfficherRedirection}   
            <div className="name">
                <input className="input" placeholder="Nom utilisateur" type="text" name="nom" id="nom" onChange={handleChange} value={values.nom} />
                {errors.nom && <p className="error">{errors.nom}</p>}
            </div>
            <div className="password">  
                <input className="input" placeholder="Mot de passe" type="password" name="password" id="password" onChange={handleChange } value={values.password} />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <Button className="mt-2" variant="outline-success" style={{ fontWeight: "bold" }} onClick={handlerFromSubmit} >
            Se connecter
            </Button>
            {(error !== "") ? (<div className="erro">{error}</div>) : ""}
        </>
    );
};
export default PageConnexion;