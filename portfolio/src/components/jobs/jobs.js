// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Card, Input, Button } from 'react-materialize';

const Jobs = () => (
  <Row>
    <Col m={12} s={12}>
        <h5>Jobs</h5>
        <Card>
          <Row>
            <Col s={12} m={12}>
              <div className="test">
                <p>Teste</p>
              </div>
            </Col>
          </Row>
        </Card>
    </Col>
  </Row>
);

export default Jobs;
