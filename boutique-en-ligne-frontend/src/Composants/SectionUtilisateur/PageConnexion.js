import React, { useEffect, useState } from "react";
import pageValidation from "./PageValidation";
import {Redirect} from 'react-router-dom';
import "./Page.css";
import Button from 'react-bootstrap/Button';


function PageConnexion() {
    const [values, setValues] = useState({nom: "", password: ""});
    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [rediriger, setRediriger] = useState(false); 
    const [role, setRole] = useState("");

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const envoyerFormulaire = (event) => {
        event.preventDefault();
        let errors = pageValidation(values);
        setErrors(errors);
        setDataIsCorrect(!errors.hasError);
    }

    useEffect(()=>{
        if(dataIsCorrect){
            let utilisateur = {
                nom:values.nom, 
                password:values.password   
            }
            verifierUtilisateur(utilisateur)
            .then(utilisateurExistant =>{  
                if(utilisateurExistant){
                    if(utilisateur.nom === "admin" && utilisateur.password === "admin"){
                        setRole("Administrateur") 
                    }else{
                        setRole("Client")             
                    }     
                   // props.setEstConnecte(true);
                    setRediriger(true);
                }
            });
        }      
        setDataIsCorrect(false)

    }, [dataIsCorrect]);

    const verifierUtilisateur = async (utilisateur) => {
        const resultat = await fetch(`/api/utilisateur/existe`, {
            method: 'post',
            body: JSON.stringify(utilisateur),
            headers: {
                'Content-Type': 'application/json'
            }               
        });
        return resultat.status === 200;
    };

    function AfficherRedirection() {
        if(rediriger === true){
            if(role ==="Administrateur"){
                return <Redirect to="/admin" />
            }
            else{   
                return <Redirect to= "/Client"/>
            };
        } 
    }
    
    return (
        <>   {AfficherRedirection()} 
            <div className="name">
                <input className = "input" placeholder = "Nom utilisateur" type="text" name = "nom" id = "nom" onChange={handleChange} value={values.nom}/>
                {errors.nom && <p className="error">{errors.nom}</p>}
            </div>
            <div className="password">  
                <input className = "input" placeholder = "Mot de passe" type = "password" name = "password" id = "password" onChange={handleChange } value={values.password} />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <Button className="mt-2" variant="outline-success"  id ="connecter" style={{ fontWeight: "bold" }} onClick={envoyerFormulaire} >
            Se connecter
            </Button>                   
        </>
    );
};
export default PageConnexion;