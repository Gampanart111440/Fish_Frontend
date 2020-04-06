import React, { useState, useEffect } from 'react';
import './fish_detail.css';
import { Container, Row, Col, Nav, NavItem } from 'reactstrap';
import { useHistory } from 'react-router-dom'
import CardFish from './CardFish';
import Navbars from '../Navbar/Navbar';
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

  const showNavbars = () => {
    let ids = localStorage.getItem('datauser')
    ids = ids.split(':')
    if (ids[0] == 5935512089) {
      return (
        <Row>
          <Col align="left">
            <Nav className="ml-auto">
              <NavItem> <a href="/datafish" className="text_nav1"> Home </a> <span>&nbsp;</span>/</NavItem>
              <NavItem> <a href="/addfish" className="text_nav"> <span>&nbsp;</span>Add data</a> </NavItem>
            </Nav>
          </Col>
          <Navbars />
        </Row>
      )
    }
    else {
      return (
        <Row>
          <Col>
          </Col>
          <Navbars />
        </Row>
      )
    }
  }

  return (
    <div className="pageWel">
      <Container>
        {showNavbars()}
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