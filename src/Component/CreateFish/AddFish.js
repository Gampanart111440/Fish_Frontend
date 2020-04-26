import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Container, Nav, NavItem } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { listAction } from '../../Redux/Reducer'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Navbars from '../Navbar/Navbar'
import firebase from '../Firebase/config'
import './add_fish.css';
function AddFish() {
    const ListAction = bindActionCreators(listAction, useDispatch())
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const [userform, setForm] = useState({
        id: "",
        local_name: "",
        common_name: "",
        scientific_name: "",
        image: "",
        fish_detail: "",
        like: 0
    })

    useEffect(() => {
        let user = localStorage.getItem('datauser');
        let ids = localStorage.getItem('ids')
        setUsername(user)
        if (username !== null && ids == 5935512089 || localStorage.getItem('name') == "GAMPANART" || localStorage.getItem('email') == 'gampanat10911@gmail.com') {
            history.push('/addfish')
        }
        else {
            history.push('/')
        }
    }, [username])

    const sendData = () => {
        if (userform.local_name && userform.common_name && userform.scientific_name && userform.image && userform.fish_detail) {
            ListAction.addFish(userform)
            history.push('/datafish')
        }
        else {
            setMessage("กรุณากรอกข้อมูลให้ครบถ้วน")
        }
    }

    return (
        <div className="pageAddfish" >
            <Container>
                <Form>
                    <Row>
                        <Col align="left">
                            <Nav className="ml-auto">
                                <NavItem> <a href="/datafish" className="text_nav"> Home </a> <span>&nbsp;</span>/ </NavItem>
                                <NavItem> <a href="/addfish" className="text_nav1"> <span>&nbsp;</span>Add data</a> </NavItem>
                            </Nav>
                        </Col>
                        <Navbars />
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup align="center">
                                <div>
                                    <h2 className="textHead2">Add Data Fish</h2>
                                </div>
                                <Input className="ip2" type="hidden" autocomplete="off" name="id" onChange={(e) => setForm({ ...userform, id: e.target.value })} />
                                <div className="formIP2">
                                    <Label className="textLabel">Local Name</Label>
                                </div>
                                <Input className="ip2" type="text" autocomplete="off" name="local_name" onChange={(e) => setForm({ ...userform, local_name: e.target.value })} placeholder="Local name" />
                                <div className="formIP2">
                                    <Label className="textLabel">Common Name</Label>
                                </div>
                                <Input className="ip2" type="text" autocomplete="off" name="common_name" onChange={(e) => setForm({ ...userform, common_name: e.target.value })} placeholder="Common name" />
                                <div className="formIP2">
                                    <Label className="textLabel">Scientific Name</Label>
                                </div>
                                <Input className="ip2" type="text" autocomplete="off" name="scientific_name" onChange={(e) => setForm({ ...userform, scientific_name: e.target.value })} placeholder="Scientific name" />
                                <div className="formIP2">
                                    <Label className="textLabel">Link Image</Label>
                                </div>
                                <Input className="ip3" type="textarea" autocomplete="off" name="image" onChange={(e) => setForm({ ...userform, image: e.target.value })} placeholder="Ex. https://upload.wikimedia.org/wikipedia/commons/f/fb/OP2.jpg" />
                                <div className="formIP2">
                                    <Label className="textLabel">Description</Label>
                                </div>
                                <Input className="ip3" type="textarea" autocomplete="off" name="fish_detail" onChange={(e) => setForm({ ...userform, fish_detail: e.target.value })} placeholder="Description" />
                                <Input className="ip2" type="hidden" autocomplete="off" name="id" onChange={(e) => setForm({ ...userform, like: e.target.value })} />
                                <p className="message">{message}</p>
                                <Button className="bt2" style={{ width: "100%", marginTop: "50px" }}
                                    onClick={() => {
                                        sendData()
                                    }}>SEND</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
}

export default AddFish;