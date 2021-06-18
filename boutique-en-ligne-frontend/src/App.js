
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import BarreNavigation from './Composants/BarreNavigation'
import PageClient from './Composants/SectionClient/PageClient'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
    <Container>
      <BarreNavigation/>
    < Route path="/Client" component={PageClient} exact/>
    </Container>
    </Router>
  );
}

export default App;
