import React, { useEffect } from 'react';
import './fish_detail.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Row, Col, Button
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { listAction } from '../../Redux/Reducer'
import { useDispatch, useSelector } from 'react-redux';
function CardFish() {
    const fishReduc = useSelector(state => state.fishReduc)
    const ListAction = bindActionCreators(listAction, useDispatch())

    useEffect(() => {
        ListAction.getFish()
    }, [])

    const showCard = () => {
        let ids = localStorage.getItem('datauser')
        ids = ids.split(':')
        if (ids[0] == 5935512089) {
            return (
                <Row>
                    {
                        fishReduc.map((item, idx) => (
                            <div key={idx} style={{ margin: 20 }} >
                                <Col>
                                    <Card style={{ width: "300px" }}>
                                        <CardImg top width="100%" className="pic" src={item.image} alt="Card image caitem" />
                                        <CardBody>
                                            <CardTitle><h1>{item.common_name}</h1></CardTitle>
                                            <CardTitle>Local name: <p>{item.local_name}</p></CardTitle>
                                            <CardSubtitle>Scientific name: <p>{item.scientific_name}</p></CardSubtitle>
                                            <CardText>Description: <p>{item.fish_detail}</p></CardText>
                                        </CardBody>
                                        <Button style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "10px" }} color="warning">Edit</Button>
                                        {
                                            item.id > 0 ?
                                                <Button style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "20px" }} onClick={() => {
                                                    ListAction.deleteFish(item.id)
                                                    setTimeout(() => {
                                                        window.location.reload()
                                                    }, 1500)
                                                }} color="danger">Delete</Button> :
                                                <Button style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "20px" }} color="danger" className="bt3">Don't Delete</Button>
                                        }
                                    </Card>
                                </Col>
                            </div>
                        ))
                    }
                </Row>
            )
        }
        else {
            return (
                <Row>
                    {
                        fishReduc.map((item, idx) => (
                            <div key={idx} style={{ margin: 20 }} >
                                <Col>
                                    <Card style={{ width: "300px" }}>
                                        <CardImg top width="100%" className="pic" src={item.image} alt="Card image caitem" />
                                        <CardBody>
                                            <CardTitle><h1>{item.common_name}</h1></CardTitle>
                                            <CardTitle>Local name: <p>{item.local_name}</p></CardTitle>
                                            <CardSubtitle>Scientific name: <p>{item.scientific_name}</p></CardSubtitle>
                                            <CardText>Description: <p>{item.fish_detail}</p></CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </div>
                        ))
                    }
                </Row>
            )
        }
    }

    return (
        <div>
            <h1 className="textWel">Welcome Fish Species</h1>
            {showCard()}
        </div>
    )
}

export default CardFish;