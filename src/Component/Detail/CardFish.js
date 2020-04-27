import React, { useState, useEffect } from 'react';
import './fish_detail.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Spinner
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { listAction } from '../../Redux/Reducer'
import { useDispatch, useSelector } from 'react-redux';
import heart from '../../Image/heart.png'
function CardFish() {
    const fishReduc = useSelector(state => state.fishReduc)
    const getFish = useSelector(state => state.getFish)
    const loading = useSelector(state => state.loading)
    const ListAction = bindActionCreators(listAction, useDispatch())
    const [modal, setModal] = useState(false);
    const [detail, setDetail] = useState({
        id: 0,
        local_name: "",
        common_name: "",
        scientific_name: "",
        image: "",
        fish_detail: "",
        like: 0
    })

    const toggle = () => setModal(!modal)

    useEffect(() => {
        ListAction.getFish()
    }, [getFish])

    const updateCard = async () => {
        await ListAction.getFish()
        setModal(false)
        ListAction.updateFish({ ...detail })
    }

    const modalCard = async (id) => {
        const detail = fishReduc.find(item => item.id === id)
        await setDetail({ ...detail })
    }

    const addLike = async (id) => {
        const detail = fishReduc.find(item => item.id === id)
        await setDetail({ ...detail, like: detail.like++ })
        ListAction.updateLike({ ...detail })
    }

    const showCard = () => {
        if (localStorage.getItem('name') == "GAMPANART" || localStorage.getItem('email') == 'gampanat10911@gmail.com') {
            return (
                <Row>
                    {
                        fishReduc.map((item, idx) => (
                            <div key={idx} style={{ margin: 20 }} >
                                <Col>
                                    <Card style={{ width: "300px" }}>
                                        <CardImg top width="100%" className="pic" src={item.image} alt="Card image caitem" />
                                        <CardBody>
                                            <CardTitle><h1 style={{ fontSize: "25px", fontWeight: "bold" }}>{item.common_name}</h1></CardTitle>
                                            <CardTitle><span style={{ fontWeight: "bold" }}>ชื่อท้องถิ่น :</span> <p>{item.local_name}</p></CardTitle>
                                            <CardSubtitle><span style={{ fontWeight: "bold" }}>ชื่อวิทยาศาสตร์ : </span><p>{item.scientific_name}</p></CardSubtitle>
                                            <CardText><span style={{ fontWeight: "bold" }}>คำอธิบาย : </span>{item.fish_detail}</CardText>
                                            <h5>{item.like.toLocaleString('en')} <span><img src={heart} width="20px" /></span></h5>
                                            <Button className="btlike" onClick={() => {
                                                addLike(item.id)
                                            }}>Like </Button>
                                        </CardBody>
                                        <Button style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "10px" }} onClick={() => {
                                            setModal(true)
                                            modalCard(item.id)
                                        }} color="warning">Edit</Button>
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
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Update Data Fish</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Input className="ip4" type="hidden" value={detail.id}
                                    onChange={(e) => {
                                        setDetail({ ...detail, id: e.target.value })
                                    }} />
                                <Label className="textLabel1">Local Name</Label>
                                <Input className="ip4" type="text" value={detail.local_name}
                                    onChange={(e) => {
                                        setDetail({ ...detail, local_name: e.target.value })
                                    }} />
                                <Label className="textLabel1">Common Name</Label>
                                <Input className="ip4" type="text" value={detail.common_name}
                                    onChange={(e) => {
                                        setDetail({ ...detail, common_name: e.target.value })
                                    }} />
                                <Label className="textLabel1">Scientific Name</Label>
                                <Input className="ip4" type="text" value={detail.scientific_name}
                                    onChange={(e) => {
                                        setDetail({ ...detail, scientific_name: e.target.value })
                                    }} />
                                <Label className="textLabel1">Link Image</Label>
                                <Input className="ip5" type="textarea" value={detail.image}
                                    onChange={(e) => {
                                        setDetail({ ...detail, image: e.target.value })
                                    }} />
                                <Label className="textLabel1">Description</Label>
                                <Input className="ip5" type="textarea" value={detail.fish_detail}
                                    onChange={(e) => {
                                        setDetail({ ...detail, fish_detail: e.target.value })
                                    }} />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => {
                                updateCard()
                            }}>Update</Button>
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
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
                                            <CardTitle><h1 style={{ fontSize: "25px", fontWeight: "bold" }}>{item.common_name}</h1></CardTitle>
                                            <CardTitle><span style={{ fontWeight: "bold" }}>ชื่อท้องถิ่น : </span><p>{item.local_name}</p></CardTitle>
                                            <CardSubtitle><span style={{ fontWeight: "bold" }}>ชื่อวิทยาศาสตร์ : </span><p>{item.scientific_name}</p></CardSubtitle>
                                            <CardText><span style={{ fontWeight: "bold" }}>คำอธิบาย : </span><p>{item.fish_detail}</p></CardText>
                                            <h5>{item.like.toLocaleString('en')} <span><img src={heart} width="20px" /></span></h5>
                                            <Button className="btlike" onClick={() => {
                                                addLike(item.id)
                                            }}>Like </Button>
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
            {
                loading !== true ? <div>{showCard()} </div> :
                    <div align="center" style={{ marginTop: "150px" }}>
                        <Spinner className="spin" />
                        <h5 style={{ color: "white" }}>กำลังโหลดข้อมูล</h5>
                    </div>
            }
        </div>
    )
}

export default CardFish;