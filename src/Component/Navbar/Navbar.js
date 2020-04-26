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
    const [name, setName] = useState('')

    const psuLogouts = () => {
        ListAction.psuLogout()
        if (psuPass.id === "" || localStorage.getItem('token') !== null) {
            localStorage.removeItem('datauser')
            localStorage.removeItem('ids')
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            localStorage.removeItem('username')
            localStorage.removeItem('email')
            history.push('/')
        }
    }

    useEffect(() => {
        let user = localStorage.getItem('datauser');
        let name = localStorage.getItem('username');
        setName(name)
        setUsername(user)
        if (username !== null || name !== null) {
            history.push('/datafish')
        }
        else {
            history.push('/')
        }
    }, [username])

    const showRole = () => {
        let ids = localStorage.getItem('ids')
        let email = localStorage.getItem('email')
        if (ids == 5935512089) {
            return (
                <div>
                    <Col align="right">
                        <div>
                            <h5 className="textName"><span className="textRole1">Admin</span> {username}</h5>
                            <Button className="btlogout" color="danger" onClick={psuLogouts}>Logout</Button>
                        </div>
                    </Col>
                </div>
            )
        }
        if (localStorage.getItem('name') == "GAMPANART") {
            return (
                <div>
                    <Col align="right">
                        <div>
                            <h5 className="textName"><span className="textRole1">Admin</span> {name}</h5>
                            <Button className="btlogout" color="danger" onClick={psuLogouts}>Logout</Button>
                        </div>
                    </Col>
                </div>
            )
        }
        if (localStorage.getItem('email') == 'gampanat10911@gmail.com') {
            return (
                <div>
                    <Col align="right">
                        <div>
                            <h5 className="textName"><span className="textRole1">Admin</span> {email}</h5>
                            <Button className="btlogout" color="danger" onClick={psuLogouts}>Logout</Button>
                        </div>
                    </Col>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Col align="right">
                        {
                            username !== null ? <div>
                                <h5 className="textName"><span className="textRole1">Guest user</span> {username}</h5>
                                <Button className="btlogout" color="danger" onClick={psuLogouts}>Logout</Button>
                            </div> :
                                <div>
                                    <h5 className="textName"><span className="textRole1">Guest user</span> {name}</h5>
                                    <Button className="btlogout" color="danger" onClick={psuLogouts}>Logout</Button>
                                </div>
                        }
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