import React from 'react'
import Container from 'react-bootstrap/Col'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useTranslation } from 'react-i18next';
export default function PageAccueil() {
  const { t } = useTranslation();
    return (
        <>
        <Container>
          <Row>
            <Col>
              <h1>{t("bonmagasinage")}</h1>
              <img src={`accueil.png`} height="600" width="1300" />
            </Col>
          </Row>   
        </Container>
      </>
    )
}
