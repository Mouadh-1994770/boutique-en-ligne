
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

function App() {
  return (
    <Router>
      <Container>
        <BarreNavigation />
        <Switch>
          <Route path="/" component={PageAccueil} exact />
          <Route path="/Client" component={PageClient} exact />
          <Route path="/admin" component={PageAdministrateur} />
          <Route path="/ajouter" component={PageAjouter} />
          <Route path="/modifier/:id" component={PageModifier} />
          <Route path="/supprimer/:id" component={PageSupprimer} />
          <Route component={Page404} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
