import React, { useState, useEffect } from 'react';
import './navbar.css';
import {
    Col, Button
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

    const showRole = () => {
        let ids = localStorage.getItem('datauser')
        ids = ids.split(':')
        if (ids[0] == 5935512089) {
            return (
                <div>
                    <Col align="right">
                        <h5><span className="textRole1">Admin</span> {username}</h5>
                        <Button color="danger" onClick={psuLogouts}>Logout</Button>
                    </Col>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Col align="right">
                        <h5><span className="textRole2">Guest user</span> {username}</h5>
                        <Button color="danger" onClick={psuLogouts}>Logout</Button>
                    </Col>
                </div>
            )
        }
    }

    return (
        <div>
            {showRole()}
        </div>
    )
}

export default Navbar;