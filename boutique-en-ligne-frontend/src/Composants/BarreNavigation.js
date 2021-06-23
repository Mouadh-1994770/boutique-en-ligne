import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "./SectionUtilisateur/Page.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useTranslation } from 'react-i18next';

function BarreNavigation(props) {
    const { t } = useTranslation();
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="m-3">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/" exact>
                        <Nav.Link><h2>{t("accueil")}</h2></Nav.Link>
                    </LinkContainer>
                </Nav>
                <Form className="page1">
                <div className="con">
                        {props.estConnecte
                        ?
                        <Button variant="outline-success">Se connecter</Button>                        
                        :
                        <LinkContainer to="/profil">
                        <Button variant="outline-success">S'identifier/S'inscrire</Button>
                        </LinkContainer>
                        }
                    </div>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default BarreNavigation;