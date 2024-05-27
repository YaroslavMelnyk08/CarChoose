import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import Row from 'react-bootstrap/esm/Row';
import AdItem from './AdItem';

const AdList = observer(() => {
    const { ad } = useContext(Context);

    if (!ad.ads) {
        return <div><h4>Завантаження оголошень</h4></div>;
    }

    if (ad.ads.length === 0) {
        return <div><h4>Оголошень не знайдено</h4></div>;
    }

    return (
        <Row className='d-flex'>
            {ad.ads.map(adItem => 
                <AdItem key={adItem.id} ad={adItem} />
            )}
        </Row>
    );
});

export default AdList;
