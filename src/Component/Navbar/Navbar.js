import React, { useState, useEffect } from 'react';
import './navbar.css';
import {
    Row, Col, Button, Nav, NavItem
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { listAction } from '../../Redux/Reducer'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
function Navbar() {
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
        <div>
            <Row>
                <Col align="left">
                    <Nav className="ml-auto">
                        <NavItem> <a href="/datafish" className="text_nav"> Home </a> <span>&nbsp;</span>/ </NavItem>
                        <NavItem> <a href="/addfish" className="text_nav"> <span>&nbsp;</span>Add data</a> </NavItem>
                    </Nav>
                </Col>
                <Col align="right">
                    <h5>{username}</h5>
                    <Button color="danger" onClick={psuLogouts}>Logout</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Navbar;