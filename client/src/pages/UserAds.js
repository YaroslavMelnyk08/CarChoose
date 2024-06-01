import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAdsByConsumer, deleteAd } from '../http/adAPI';
import AdItem from '../components/AdItem';
import Button from 'react-bootstrap/Button';
import { CREATE_AD_ROUTE } from '../utils/consts';
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import '../styles/UserAds.css';

const UserAds = observer(() => {
    const [ads, setAds] = useState([]);
    const navigate = useNavigate();
    const { ad, user } = useContext(Context);

    useEffect(() => {
        fetchAdsByConsumer(user.userId)
            .then(data => setAds(data))
            .catch(error => {
                console.error("Error fetching user's ads:", error.message);
            });
    }, [user.userId]);

    const handleDeleteAd = async (id) => {
        try {
            const adToDelete = ads.find(ad => ad.id === id);
            await deleteAd(id);
            const updatedAds = ads.filter(ad => ad.id !== id);
            setAds(updatedAds);
            alert(`Оголошення про продаж "${adToDelete.title}" видалено`);
        } catch (error) {
            console.error("Error deleting ad:", error.message);
        }
    };

    return (
        <Container className='Container'>
            <h2>Мої оголошення</h2>
            {ads.length === 0 ? (
                <p>У вас немає оголошень.</p>
            ) : (
                <div className='ads-grid'>
                    {ads.map(ad => (
                        <div key={ad.id} className='ad-item'>
                            <AdItem ad={ad} />
                            <Button className='mt-1' onClick={() => navigate(`${CREATE_AD_ROUTE}/${ad.id}`)}>
                                Редагувати оголошення
                            </Button>
                            <Button variant="danger" className='mt-1' onClick={() => handleDeleteAd(ad.id)}>
                                Видалити оголошення
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
});

export default UserAds;