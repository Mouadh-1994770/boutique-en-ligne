import {
    React,
    useState
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';


function FormulaireAjouterProduit({ id }) {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [categorie, setCategorie] = useState('');
    const [prix, setPrix] = useState('');
    const [rabais, setRabais] = useState('');
    const [quantite, setQuantite] = useState('');

    const [nomEcrit, setNomEcrit] = useState(true);
    const [descriptionEcrite, setDescriptionEcrite] = useState(true);
    const [categorieEcrite, setCategorieEcrite] = useState(true);
    const [prixEcrit, setPrixEcrit] = useState(true);
    const [rabaisEcrit, setRabaisEcrit] = useState(true);
    const [quantiteEcrite, setQuantiteEcrite] = useState(true);

    const [rediriger, setRediriger] = useState(false);

    const envoyerFormulaire = async () => {
        await fetch(`/api/produits/ajouter`, {
            method: 'put',
            body: JSON.stringify({ nom, description, categorie, prix, rabais, quantite }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };
    function validerFormulaire() {
        setNomEcrit(nom !== "");
        setDescriptionEcrite(description !== "");
        setCategorieEcrite(categorie !== "");
        setPrixEcrit(prix !== "");
        setRabaisEcrit(rabais !== "");
        setQuantiteEcrite(quantite !== "");

        if ((nom !== "") && (description !== "") && (categorie !== "") && (prix !== "")
            && (rabais !== "") && (quantite !== "")) {
            envoyerFormulaire();
        }
    }

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/administrateur" />
        }
    }

    return (
        <>
            {AfficherRedirection()}
            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>Nom
                    {nomEcrit === false ?
                            <span className="text-danger"> * Vous devez entrer un nom!</span>
                            : undefined
                        }
                    </Form.Label>
                    <Form.Control type="text" value={nom}
                        onChange={(event) => setNom(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description
                    {descriptionEcrite === false ?
                            <span className="text-danger"> * Vous devez entrer une description!</span>
                            : undefined
                        }
                    </Form.Label>
                    <Form.Control type="text" value={description}
                        onChange={(event) => setDescription(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Cat??gorie
                    {categorieEcrite === false ?
                            <span className="text-danger"> * Vous devez entrer une cat??gorie!</span>
                            : undefined
                        }
                    </Form.Label>
                    <Form.Control type="text" value={categorie}
                        onChange={(event) => setCategorie(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Prix
                    {prixEcrit === false ?
                            <span className="text-danger"> * Vous devez entrer un prix!</span>
                            : undefined
                        }
                    </Form.Label>
                    <Form.Control type="number" value={prix}
                        onChange={(event) => setPrix(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Rabais
                    {rabaisEcrit === false ?
                            <span className="text-danger"> * Vous devez entrer un rabais!</span>
                            : undefined
                        }
                    </Form.Label>
                    <Form.Control type="number" value={rabais}
                        onChange={(event) => setRabais(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Quantit??
                    {quantiteEcrite === false ?
                            <span className="text-danger"> * Vous devez entrer une quantit??!</span>
                            : undefined
                        }
                    </Form.Label>
                    <Form.Control type="number" value={quantite}
                        onChange={(event) => setQuantite(event.target.value)} />
                </Form.Group>

                <Button variant="primary" onClick={validerFormulaire} >
                    Ajouter
            </Button>
            </Form>
        </>
    );
}

export default FormulaireAjouterProduit;