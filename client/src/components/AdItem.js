import React, { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import { AD_ROUTE } from '../utils/consts';
import '../styles/AdItem.css';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Context } from '..';
import { fetchFavoritesByConsumer, addFavorite, removeFavorite } from '../http/favoriteAPI';

const AdItem = ({ ad }) => {
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);

    useEffect(() => {
        if (user.user.id) {
            fetchFavoritesByConsumer(user.user.id).then(data => {
                const favorite = data.find(fav => fav.AdId === ad.id);
                if (favorite) {
                    setIsFavorite(true);
                    setFavoriteId(favorite.id);
                }
            });
        }
    }, [ad.id, user.user.id]);

    const handleFavoriteToggle = (e) => {
        e.stopPropagation();
        if (!user.isAuth) {
            alert('Необхідно авторизуватися, щоб додавати до обраного.');
            return;
        }
        if (isFavorite) {
            removeFavorite(favoriteId).then(() => {
                setIsFavorite(false);
                setFavoriteId(null);
            });
        } else {
            addFavorite({ ConsumerId: user.user.id, AdId: ad.id }).then(favorite => {
                setIsFavorite(true);
                setFavoriteId(favorite.id);
            });
        }
    };

    const mainPhoto = ad.AdPhotos && ad.AdPhotos.length > 0 
        ? `${process.env.REACT_APP_API_URL}/${ad.AdPhotos[0].file_name}`
        : `${process.env.REACT_APP_API_URL}noPhoto.jpg`
    ;

    return (
        <Col md={6} className="mb-4">
            <Card
                style={{ width: 425, cursor: 'pointer', borderColor: isFavorite ? 'rgba(255, 0, 0)' : '#658fd7' }}
                onClick={() => navigate(AD_ROUTE + '/' + ad.id)}
                className='itemCard'
            >
                <div className="image-container">
                    <Image className="ad-image" src={mainPhoto} />
                </div>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <Card.Title>{ad.title} {ad.year_of_manufacture}</Card.Title>
                        <div>
                            <button onClick={handleFavoriteToggle} className='heartBtn'>
                                {isFavorite ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                            </button>
                        </div>
                    </div>
                    <Card.Text className='mt-2'>
                        <strong>Ціна:</strong> {ad.price} $<br />
                        <strong>Пробіг:</strong> {ad.mileage}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default AdItem;