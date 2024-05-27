import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import { AD_ROUTE } from '../utils/consts';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Імпорт іконок серця
import '../styles/AdItem.css'; // Імпорт файлу стилів

const AdItem = ({ ad }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false); // Стейт для відстеження статусу обраного

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        // Тут можна додати логіку для збереження цього статусу на бекенді або в контексті
    };

    return (
        <Col md={6} className="mb-4">
            <Card
                style={{ width: 425, cursor: 'pointer', backgroundColor: isFavorite ? 'rgba(255, 0, 0, 0.1)' : 'white' }}
                onClick={() => navigate(AD_ROUTE + '/' + ad.id)}
                className='itemCard'
            >
                <div className="image-container">
                    <Image className="ad-image" src={process.env.REACT_APP_API_URL + ad.photo} />
                </div>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <Card.Title>{ad.title} {ad.year_of_manufacture}</Card.Title>
                        <div onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}>
                            {isFavorite ? <FaHeart className="heart-icon" /> : <FaRegHeart className="heart-icon" />}
                        </div>
                    </div>
                    <Card.Text>
                        <strong>Ціна:</strong> {ad.price} $<br />
                        <strong>Пробіг:</strong> {ad.mileage}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default AdItem;
