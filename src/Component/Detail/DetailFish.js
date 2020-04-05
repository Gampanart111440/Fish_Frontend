import React, { useState, useEffect } from 'react';
import './fish_detail.css';
import { Container, Button, Row, Col } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { listAction } from '../../Redux/Reducer'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import CardFish from './CardFish';
function DetailFish() {
  const ListAction = bindActionCreators(listAction, useDispatch())
  const psuPass = useSelector(state => state.psuPass)
  const history = useHistory()
  const [username, setUsername] = useState('')

  const psuLogouts = () => {
    ListAction.psuLogout()
    if (psuPass.id === "") {
      localStorage.removeItem('datauser')
      history.push('/')
    }
  }

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
        <h1 className="textWel"> Welcome</h1>
        <Row>
          <Col>
            <h5>{username}</h5>
            <Button color="danger" onClick={psuLogouts}>Logout</Button>
          </Col>
        </Row>
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