import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import { AD_ROUTE } from '../utils/consts';

const AdItem = ({ ad }) => {
    const navigate = useNavigate();

    return (
        <Col md={6} className="mb-4" onClick={() => navigate(AD_ROUTE + '/' + ad.id)}>
            <Card style={{ width: 400, cursor: 'pointer' }} border={'light'}>
                <Image width={400} height={300} src={process.env.REACT_APP_API_URL + ad.photo} />
                <Card.Body>
                    <Card.Title>{ad.title} {ad.year_of_manufacture}</Card.Title>
                    <Card.Text>
                        <strong>Price:</strong> {ad.price} $<br />
                        <strong>Mileage:</strong> {ad.mileage}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default AdItem;
