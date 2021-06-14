
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import BarreNavigation from './Composants/BarreNavigation'
import pageClient from './Composants/SectionClient/pageClient'
import Container from 'react-bootstrap/Container'
function App() {
  return (
    <Router>
    <Container>
      <BarreNavigation/>
    < Route path="/Client" component={pageClient} exact/>
    </Container>
    </Router>
  );
}

export default App;
