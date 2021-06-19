import {
    React,
    useState,
    useEffect
} from 'react';
import ListeProduitsAdministrateur from '../Composants/ListeProduitsAdministrateur';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Nav, NavDropdown, FormControl, Form, Navbar, Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function PageAdministrateur() {
    const [ListeProduits, setListeProduits] = useState([]);
    const [typeDeTri, setTypeDeTri] = useState('categorieOrdreCroissant');
    const [motRechercher, setMotRechercher] = useState('');

    useEffect(() => {
        const chercherProduits = async () => {
            const resultat = await fetch(`/api/produits`);
            const body = await resultat.json().catch((error) => { console.log(error) });
            setListeProduits(body);
        };
        chercherProduits();
    }, []);
    console.log('testez ');
    console.log(motRechercher);
    return (
        <>
            <h1>Page administrateur</h1>

            <Link to="/ajouter">
                <Button>Ajouter un nouveau produit</Button>
            </Link>

            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Trier par :" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => setTypeDeTri('nomOrdreCroissant')}>Nom ⇑</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setTypeDeTri('nomOrdreDecroissant')}>Nom ⇓</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setTypeDeTri('categorieOrdreCroissant')}>Catégorie ⇑</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setTypeDeTri('categorieOrdreDecroissant')}>Catégorie ⇓</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setTypeDeTri('prixOrdreCroissant')}>Prix ⇑</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setTypeDeTri('prixOrdreDecroissant')}>Prix ⇓</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setTypeDeTri('rabaisOrdreCroissant')}>Rabais ⇑</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setTypeDeTri('rabaisOrdreDecroissant')}>Rabais ⇓</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setTypeDeTri('quantiteOrdreCroissant')}>Quantité disponible ⇑</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setTypeDeTri('quantiteOrdreDecroissant')}>Quantité disponible ⇓</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setTypeDeTri('descriptionOrdreCroissant')}>Description ⇑</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setTypeDeTri('descriptionOrdreDecroissant')}>Description ⇓</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Chercher" className="mr-sm-2" value={motRechercher} onChange={(event) => setMotRechercher(event.target.value)} />
                        <Button variant="outline-success" onClick={() => setTypeDeTri('recherche')}  >Chercher</Button>
                    </Form>

                </Navbar.Collapse>
            </Navbar>

            <h2>Liste des produits</h2>

            <ListeProduitsAdministrateur produits={ListeProduits} tri={typeDeTri} motRechercher={motRechercher} />
        </>
    );
}

export default PageAdministrateur;