import React, { useState, useEffect } from 'react';
import './fish_detail.css';
import { Container, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom'
import CardFish from './CardFish';
import Navbar from '../Navbar/Navbar';
function DetailFish() {
  const history = useHistory()
  const [username, setUsername] = useState('')

  useEffect(() => {
    let user = localStorage.getItem('datauser');
    setUsername(user)
    if (username !== null) {
      history.push('/datafish')
    }
    else {
      history.push('/')
    }
  }, [username])

  return (
    <div className="pageWel">
      <Container>
        <Navbar />
        <Row>
          <Col>
            <CardFish />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DetailFish;