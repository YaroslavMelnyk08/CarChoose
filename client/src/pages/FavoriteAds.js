import React, { useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import AdItem from '../components/AdItem';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const FavoriteAds = observer(() => {
    const { user, ad } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ad.fetchFavoritesByConsumer(user.user.id).finally(() => setLoading(false));
    }, [ad, user.user.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container className='Container'>
            <h2 className='mb-4'>Улюблені оголошення</h2>
            {ad.favorites.length === 0 ? (
                <div style={{marginBottom: 456}}><h4>Покищо тут немає оголошень</h4></div>
            ) : (
                <Row>
                    {ad.favorites.map(ad => (
                        <AdItem key={ad.id} ad={ad.Ad} />
                    ))}
                </Row>
            )}
        </Container>
    );
});

export default FavoriteAds;