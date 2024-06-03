import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import Row from 'react-bootstrap/esm/Row';
import AdItem from './AdItem';

const AdList = observer(() => {
    const { ad, user } = useContext(Context);
    const [deletedAdMessage, setDeletedAdMessage] = useState(null);

    useEffect(() => {
        const messageData = JSON.parse(localStorage.getItem('deletedAdMessage'));
        if (messageData && messageData.userId === user.user.id) {
            setDeletedAdMessage(messageData.message);
            localStorage.removeItem('deletedAdMessage');
        }
    }, [user.user.id]);

    if (!ad.ads) {
        return <div><h4>Завантаження оголошень</h4></div>;
    }

    if (ad.ads.length === 0) {
        return <div><h4>Оголошень не знайдено</h4></div>;
    }

    return (
        <div>
            <Row className='d-flex'>
                {ad.ads.map(adItem => 
                    <AdItem key={adItem.id} ad={adItem} />
                )}
            </Row>
        </div>
    );
});

export default AdList;