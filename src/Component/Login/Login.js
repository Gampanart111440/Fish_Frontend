import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { listAction } from '../../Redux/Reducer'
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import firebase from '../Firebase/config'
import GoogleLogin from 'react-google-login';
import './login.css';

function Login() {
  const dispatch = useDispatch()
  const ListAction = bindActionCreators(listAction, dispatch)
  const psuData = useSelector(state => state.psuData)
  const history = useHistory()
  const [userdata, setUser] = useState({
    username: "",
    password: ""
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (psuData.id) {
      history.push('/datafish')
      let datauser = psuData.id + " : " + psuData.name + " " + psuData.surname
      localStorage.setItem('datauser', datauser)
      localStorage.setItem('ids', psuData.id)
    }
    if (localStorage.getItem('datauser') !== null || localStorage.getItem('token') !== null || localStorage.getItem('email')) {
      history.push('/datafish')
    }
    else {
      history.push('/')
    }
  }, [psuData])

  const loginF = e => {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(userdata.username, userdata.password).then((res) => {
      localStorage.setItem('email', res.user.email)
      history.push('/datafish')
    })
      .catch((err) => {
        console.log(err);
        setMessage(err.message)
      })
  }

  const sendData = () => {
    if (userdata.username && userdata.password) {
      ListAction.psuLogin(userdata)
    }
    else {
      setMessage("Incorrect user ID or password")
    }
    if (!psuData.id) {
      setTimeout(() => {
        setMessage("Incorrect user ID or password")
      }, 4000)
    }
  }

  const responseGoogle = (response) => {
    if (response) {
      const token = response.accessToken
      const name = response.profileObj.givenName
      const username = response.profileObj.name
      localStorage.setItem('token', token)
      localStorage.setItem('name', name)
      localStorage.setItem('username', username)
    }
    if (localStorage.getItem('token') !== null) {
      history.push('/datafish')
    }
    else {
      history.push('/')
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
                <Input className="ip1" type="text" name="username" onChange={(e) => setUser({ ...userdata, username: e.target.value })} placeholder="Username/Email" />
                <div className="formIP">
                  <Label className="textLabel">Password</Label>
                </div>
                <Input className="ip1" type="password" name="password" onChange={(e) => setUser({ ...userdata, password: e.target.value })} placeholder="Password" />
                <p className="message">{message}</p>
                <Button className="bt1" style={{ width: "100%", marginTop: "50px" }}
                  onClick={() => {
                    sendData()
                  }}>LOGIN WITH PSU PASSPORT</Button>
                <br></br>
                <Button className="bt5" style={{ width: "100%", marginTop: "50px" }}
                  onClick={loginF}>LOGIN WITH FIREBASE (ADMIN)</Button>
              </FormGroup>
              <div align="center">
                <GoogleLogin
                  className="googleAuth"
                  clientId="681528916775-230uhg5ku0i2hofhlmj9g0klthmnvr0o.apps.googleusercontent.com"
                  buttonText="LOGIN WITH GOOGLE"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                />
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}

const mapStateToProps = state => ({ psuData: state.psuData })

export default connect(mapStateToProps)(Login);