import React, { useEffect } from 'react';
import './fish_detail.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Row, Col
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
            <h1 className="textWel">Fish Species</h1>
            <Row>{
                fishReduc.map((p, index) => (
                    <div key={index} style={{ margin: 20 }} >
                        <Col>
                            <Card style={{ width: "300px" }}>
                                <CardImg top width="100%" className="pic" src={p.image} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle><h1>{p.common_name}</h1></CardTitle>
                                    <CardSubtitle><h4>{p.scientific_name}</h4></CardSubtitle>
                                    <CardText><p>{p.fish_detail}</p></CardText>
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