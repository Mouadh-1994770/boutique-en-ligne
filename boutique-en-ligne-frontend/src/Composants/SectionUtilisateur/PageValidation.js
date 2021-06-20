function pageValidation(values, modeInscription = false) {

    let errors = {};
    errors.hasError = false;

    if (!values.nom) {
        errors.nom = "Le nom est obligatoire";
        errors.hasError = true;
    }
    else if(!new RegExp(/^[A-Za-z]+$/).test(values.nom)){
        errors.nom = "Le nom est invalide";
        errors.hasError = true;
    }     
    if (!values.password ) {
        errors.password = "Le mot de passe est obligatoire";
        errors.hasError = true;
    }
    else if (values.password.lenght < 5) {
        errors.password = "Le mot de passe doit avoir plus de 5 caractères";
        errors.hasError = true;
    }
    if(modeInscription && values.password !== values.confirmPassword){
        errors.confirmPassword = "Les mots de passe doivent être identiques";
        errors.hasError = true;
    }
    return errors
}
export default pageValidation;