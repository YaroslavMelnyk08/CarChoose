import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/esm/CardBody';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/esm/Image';
import Row from 'react-bootstrap/esm/Row';
import { Context } from '..';
import { useParams } from 'react-router-dom';
import { fetchOneAd } from '../http/adAPI';

const AdPage = () => {
    const [ad, setAd] = useState(Context)
    const {id} = useParams()

    useEffect(() => {
        fetchOneAd(id).then(data => setAd(data))
    }, [])

    return (
        <div>
            <Container className='mt-4'>
                <Row>
                    {ad.title} {ad.year_of_manufacture}
                </Row>
                <Row className='mt-4'>
                    <Col>
                        <Card style={{width: 500, height: 400}}>
                            <Row>
                                Ціна: {ad.price}
                            </Row>
                            <Row>
                                Пробіг: {ad.mileage}
                            </Row>
                        </Card>
                    </Col>
                    <Col>
                        <Image width={700} src={process.env.REACT_APP_API_URL + ad.photo}/>
                    </Col>
                    
                </Row>
            </Container>
        </div>
    );
};

export default AdPage;