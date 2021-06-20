import React, {useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BarreNavigation from './Composants/BarreNavigation'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import PageClient from './Composants/SectionClient/PageClient'
import PageAccueil from './pages/PageAccueil';
import PageAdministrateur from './pages/PageAdministrateur';
import PageAjouter from './pages/PageAjouter';
import PageModifier from './pages/PageModifier';
import PageSupprimer from './pages/PageSupprimer';
import Page404 from './pages/Page404';
import PageProfil from './Composants/SectionUtilisateur/PageProfils';
import PageConnexion from './Composants/SectionUtilisateur/PageConnexion';
import PageInscription from './Composants/SectionUtilisateur/PageInscription';

function App() {
  const [estConnecte,  setEstConnecte] = useState(false);
  return (
    <Router>
      <Container>
        <BarreNavigation estConnecte={estConnecte}/>
        <Switch>
          <Route path="/" component={PageAccueil} exact />
          <Route path="/Client" component={PageClient}/>
          <Route path="/admin" component={PageAdministrateur} />
          <Route path="/ajouter" component={PageAjouter} />
          <Route path="/modifier/:id" component={PageModifier} />
          <Route path="/supprimer/:id" component={PageSupprimer} />
          <Route path="/profil" component={PageProfil} />
          <Route path="/inscription" component={PageInscription} />
          <Route path="/connexion" component={<PageConnexion setEstConnecte={setEstConnecte} />} />
          <Route component={Page404} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
