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

    return (
        <div>
            <h1 className="textWel">Welcome Fish Species</h1>
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
        </div>
    )
}

export default CardFish;