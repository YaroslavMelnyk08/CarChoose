import React, { useContext, useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import FilterBar from '../components/FilterBar';
import AdList from '../components/AdList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchAccidents, fetchAds, fetchCars, fetchColors, fetchDrivenFrom, fetchPaintConditions } from '../http/adAPI';
import Pages from '../components/Pages';

const Main = observer(() => {
    const { ad } = useContext(Context);

    useEffect(() => {
        fetchCars().then(data => ad.setCars(data));
        fetchPaintConditions().then(data => ad.setPaintConditions(data));
        fetchColors().then(data => ad.setColors(data));
        fetchAccidents().then(data => ad.setAccidents(data));
        fetchDrivenFrom().then(data => ad.setDrivenFrom(data));
        fetchAds(null, null, null, null, null, 1, 6).then(data => {
            ad.setAds(data.rows);
            ad.setTotalCount(data.count);
        }).catch(error => {
            console.error("Error fetching ads on initial load:", error.message);
        });
    }, [ad]);

    useEffect(() => {
        fetchAds(ad.selectedCar?.id, ad.selectedPaintCondition?.id, ad.selectedColor?.id, ad.selectedAccident?.id, ad.selectedDrivenFrom?.id, ad.page, 6).then(data => {
            ad.setAds(data.rows);
            ad.setTotalCount(data.count);
        }).catch(error => {
            console.error("Error fetching ads on filter change:", error.message);
        });
    }, [ad.selectedCar, ad.selectedPaintCondition, ad.selectedColor, ad.selectedAccident, ad.selectedDrivenFrom, ad.page]);

    return (
        <Container className='Container'>
            <Row>
                <Col md={3}>
                    <FilterBar />
                </Col>
                <Col md={9}>
                    <AdList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Main;
