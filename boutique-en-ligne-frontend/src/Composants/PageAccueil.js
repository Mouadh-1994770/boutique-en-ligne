import React from 'react'
import Container from 'react-bootstrap/Col'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
export default function PageAccueil() {
    return (
        <>
        <Container>
          <Row>
            <Col>
              <h1>Bonne magasinage</h1>
              <img src={`accueil.png`} height="600" width="1300" />
            </Col>
          </Row>
          
        </Container>
      </>
    )
}
