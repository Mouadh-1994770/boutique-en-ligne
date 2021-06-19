import React, { useState, useEffect } from "react";
import PageValidation from "./PageValidation";
import { Redirect } from 'react-router-dom';
import "./Page.css";
import Button from 'react-bootstrap/Button';


const PageInscription = () => {
    const [values, setValues] = useState({role:"", nom: "", password: "", confirmPassword: ""});
    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [rediriger, setRediriger] = useState(false);

    useEffect(()=>{
        if(values.role ==="Admin"){
            setValues({role:"Admin"
        });
        }else if(values.role ==="Client"){
            setValues({role:"Client"
        });
        } 
    },[values.role])

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const envoyerFormulaire = async (utilisateur) => {
        await fetch(`/api/utilisateur/ajouter`, {
            method: 'post',
            body: JSON.stringify(utilisateur),
            headers: {
                'Content-Type': 'application/json'
            }               
        });
        setRediriger(true);       
    };

    const validerFormulaire = () => {
        let errors = PageValidation(values, true);
        setErrors(errors);
        setDataIsCorrect(!errors.hasError);
    }

    useEffect(()=>{
        if(dataIsCorrect){
            let utilisateur = {
                role: values.role,
                nom:values.nom, 
                password:values.password,
                confirmPassword:values.confirmPassword
            }  
            envoyerFormulaire(utilisateur);          
        }          
        setDataIsCorrect(false)

    }, [dataIsCorrect]);

   
    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/" />
        }
    }

    return (
        <>
            {AfficherRedirection()}
            <div className="name" onChange={handleChange}>
                <input className="input1"  type="radio" name="role" id="role"  value="Admin" /><h4>Admin</h4>
                <input className="input1"  type="radio" name="role" id="role"  value="Client" /><h4>Client</h4>
                {errors.role && <p className="error">{errors.role}</p>}
            </div>             
            <div className="name">
                <input className="input" placeholder="Nom utilisateur" type="text" name="nom" id="nom" onChange={handleChange} value={values.nom} />
                {errors.nom && <p className="error">{errors.nom}</p>}
            </div>
            <div className="password">
                <input className="input" placeholder="Mot de passe" type="password" name="password" id="password" onChange={handleChange} value={values.password} />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="password">
                <input className="input" placeholder="Confirmer mot de passe" type="password" name="confirmPassword" id="password-conf" onChange={handleChange} value={values.confirmPassword} />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div> 
            <Button className="mt-2" variant="outline-success" style={{ fontWeight: "bold" }} onClick={validerFormulaire} >
            Créer votre compte
            </Button>      
        </>
    );
    
};
export default PageInscription;





