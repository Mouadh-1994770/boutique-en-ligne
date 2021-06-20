import {
    React,
    useState,
    useEffect
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

function FormulaireModifierProduit({ id }) {
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

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/produits/${id}`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setNom(body.nom);
            setDescription(body.description);
            setCategorie(body.categorie);
            setPrix(body.prix);
            setRabais(body.rabais);
            setQuantite(body.quantite);
        };
        chercherDonnees();
    }, [id]);

    const envoyerFormulaire = async () => {
        await fetch(`/api/produits/modifier/${id}`, {
            method: 'post',
            body: JSON.stringify({ nom, description, categorie, prix, rabais, quantite }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/admin" />
        }
    }

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
                    <Form.Label>Catégorie
                    {categorieEcrite === false ?
                            <span className="text-danger"> * Vous devez entrer une catégorie!</span>
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
                    <Form.Label>Quantité
                    {quantiteEcrite === false ?
                            <span className="text-danger"> * Vous devez entrer une quantité!</span>
                            : undefined
                        }
                    </Form.Label>
                    <Form.Control type="number" value={quantite}
                        onChange={(event) => setQuantite(event.target.value)} />
                </Form.Group>

                <Button variant="success" onClick={validerFormulaire} >
                    Modifier
            </Button>
            </Form>
        </>
    );
}

export default FormulaireModifierProduit;