import React, { useState, useEffect } from "react";
import pageValidation from "./PageValidation";
import "./Page.css";
import Button from 'react-bootstrap/Button';


const PageInscription = () => {
    const [values, setValues] = useState({ nom: "", password: "", confirmPassword: ""});
    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const [message, setMessage] = useState();

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const envoyerFormulaire = async (utilisateur) => {
     const resultat = await fetch(`/api/utilisateur/ajouter`, {
            method: 'post',
            body: JSON.stringify(utilisateur),
            headers: {
                'Content-Type': 'application/json'
            }               
        }); 
        return resultat;
    };

    const validerFormulaire = () => {
        let errors = pageValidation(values, true);
        setErrors(errors);
        setDataIsCorrect(!errors.hasError);
    }

    useEffect(()=>{
        if(dataIsCorrect){
            let utilisateur = {
                nom:values.nom, 
                password:values.password,
                confirmPassword:values.confirmPassword
            }  
            envoyerFormulaire(utilisateur)
            .then(response =>{               
                if(response.status === 200){
                    setMessage({className:"success",value:"L'utilisateur a été ajouté"});
                    setTimeout(()=>{document.getElementById('connecter').click()}, 5000);
                }else if (response.status === 406){
                    setMessage({className:"error",value:"L'utilisateur existe déjà"});
                }
            });          
        }          
        setDataIsCorrect(false)

    }, [dataIsCorrect]);

    return (
        <>
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
            <br/>  
            <br/>  
            {message && <p className={message.className}>{message.value}</p>}  
        </>
    );
    
};
export default PageInscription;


