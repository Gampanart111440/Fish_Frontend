import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { listAction } from '../../Redux/Reducer'
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import './login.css';

function Login() {
  const dispatch = useDispatch()
  const ListAction = bindActionCreators(listAction, dispatch)
  const psuPass = useSelector(state => state.psuPass)
  const history = useHistory()
  const [userdata, setUser] = useState({
    username: "",
    password: ""
  })

  const [message, setMessage] = useState('')

  useEffect(() => {
    if (psuPass.id) {
      history.push('/datafish')
      let datauser = psuPass.id + " : " + psuPass.name + " " + psuPass.surname
      localStorage.setItem('datauser', datauser)
      localStorage.setItem('ids', psuPass.id)
    }
    if (localStorage.getItem('datauser') !== null) {
      history.push('/datafish')
    }
    else {
      history.push('/')
    }
  }, [psuPass])

  const sendData = () => {
    if (userdata.username && userdata.password) {
      ListAction.psuLogin(userdata)
    }
    else {
      setMessage("Incorrect user ID or password")
    }
    if (!psuPass.id) {
      setTimeout(() => {
        setMessage("Incorrect user ID or password")
      }, 4000)
    }
  }

  return (
    <div className="pageLogin" >
      <Container>
        <Form>
          <Row>
            <Col>
              <FormGroup align="center">
                <div>
                  <h2 className="textHead">LOGIN PSU PASSPORT</h2>
                </div>
                <div className="formIP">
                  <Label className="textLabel">Username</Label>
                </div>
                <Input className="ip1" type="text" name="username" onChange={(e) => setUser({ ...userdata, username: e.target.value })} placeholder="Username" />
                <div className="formIP">
                  <Label className="textLabel">Password</Label>
                </div>
                <Input className="ip1" type="password" name="password" onChange={(e) => setUser({ ...userdata, password: e.target.value })} placeholder="Password" />
                <p className="message">{message}</p>
                <Button className="bt1" style={{ width: "100%", marginTop: "50px" }}
                  onClick={() => {
                    sendData()
                  }}>LOGIN</Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

const mapStateToProps = state => ({ psuPass: state.psuPass })

export default connect(mapStateToProps)(Login);