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

    return (
        <>
            {AfficherRedirection()}
            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" value={nom}
                        onChange={(event) => setNom(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={description}
                        onChange={(event) => setDescription(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Catégorie</Form.Label>
                    <Form.Control type="text" value={categorie}
                        onChange={(event) => setCategorie(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Prix</Form.Label>
                    <Form.Control type="text" value={prix}
                        onChange={(event) => setPrix(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Rabais</Form.Label>
                    <Form.Control type="text" value={rabais}
                        onChange={(event) => setRabais(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Quantite</Form.Label>
                    <Form.Control type="text" value={quantite}
                        onChange={(event) => setQuantite(event.target.value)} />
                </Form.Group>

                <Button variant="success" onClick={envoyerFormulaire} >
                    Modifier
            </Button>
            </Form>
        </>
    );
}

export default FormulaireModifierProduit;