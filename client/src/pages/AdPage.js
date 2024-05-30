import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import { fetchOneAd } from '../http/adAPI';
import '../styles/AdStyles.css';

const AdPage = () => {
    const [ad, setAd] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchOneAd(id).then(data => setAd(data));
    }, [id]);

    return (
        <Container className='Container'>
            <Row className='titleAdContainer'>
                <h1 className='titleAd'>{ad.title} {ad.year_of_manufacture}</h1>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <Card className='adCardOptions' style={{ width: '80%', height: 'auto' }}>
                        <Card.Body>
                            <Card.Text>
                                <strong>Ціна:</strong> {ad.price} USD
                            </Card.Text>
                            <Card.Text>
                                <strong>Пробіг:</strong> {ad.mileage} км
                            </Card.Text>
                            <Card.Text>
                                <strong>Опис:</strong> {ad.description}
                            </Card.Text>
                            {ad.Consumer && (
                                <>
                                    <Card.Text>
                                        <strong>Продавець:</strong> {ad.Consumer.last_name} {ad.Consumer.first_name}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Номер телефону:</strong> {ad.Consumer.phone_number}
                                    </Card.Text>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Image width="100%" src={process.env.REACT_APP_API_URL + ad.photo} />
                </Col>
            </Row>
        </Container>
    );
};

export default AdPage;