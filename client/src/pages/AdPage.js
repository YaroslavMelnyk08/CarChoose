import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import { fetchOneAd } from '../http/adAPI';
import '../styles/AdStyles.css';
import Carousel from 'react-bootstrap/Carousel';

const AdPage = () => {
    const [ad, setAd] = useState({ AdPhotos: [] });
    const { id } = useParams();

    useEffect(() => {
        fetchOneAd(id).then(data => {
            setAd(data);
        });
    }, [id]);

    if (!ad) {
        return <div>Оголошення не знайдено</div>;
    }

    return (
        <Container className='Container'>
            <Row className='titleAdContainer'>
                {ad.Car && (
                    <>
                        <h1 className='titleAd'>{ad.title} {ad.year_of_manufacture}</h1>
                        <strong style={{fontSize: '140%', padding: '0'}}>Покоління: {ad.Car.generation} 🚘 {ad.Car.trim}</strong>
                    </>
                )}
            </Row>
            <Row className='mt-4'>
                <Col>
                    <Card className='adCardOptions mb-3 adFontSize' style={{ width: '80%', height: 'auto' }}>
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
                        </Card.Body>
                    </Card>
                    <Card className='adCardOptions mb-3 adFontSize' style={{ width: '80%', height: 'auto' }}>
                        <Card.Body>
                            <h3>Продавець</h3>
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
                    <Card className='adCardOptions adFontSize' style={{ width: '80%', height: 'auto' }}>
                        <Card.Body>
                            <h3> Характеристики авто </h3>
                            {ad.PaintCondition && ad.Color && ad.Accident && ad.DrivenFrom && ad.Car && (
                                <>
                                    <Card.Text>
                                        <strong>Стан ЛФП:</strong> {ad.PaintCondition.paint_condition_name}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Опис стану ЛФП:</strong> {ad.PaintCondition.paint_condition_description}
                                    </Card.Text>
                                    <Card.Text>
                                       <strong>Колір:</strong> {ad.Color.color_name}
                                    </Card.Text>
                                    <Card.Text>
                                       <strong>Колір:</strong> {ad.Accident.accident_name}
                                    </Card.Text>
                                    <Card.Text>
                                       {ad.DrivenFrom.country_name === "Україна" ? <strong>Куплений в:</strong> : <strong>Пригнаний з:</strong>} {ad.DrivenFrom.country_name}
                                    </Card.Text>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                    <Card className='adCardOptions mt-3 adFontSize' style={{ width: '80%', height: 'auto' }}>
                        <Card.Body>
                            <h3> Технічні характеристики авто </h3>
                            {ad.Car && (
                                <>
                                    <Card.Text>
                                       <strong>Двигун:</strong> {ad.Car.capacity_cm3} см³ 🚘 ({ad.Car.engine_hp} к.с) 🚘 {ad.Car.engine_type}
                                    </Card.Text>
                                    <Card.Text>
                                       <strong>Коробка передач:</strong>  {ad.Car.transmission}
                                    </Card.Text>
                                    <Card.Text>
                                       <strong>Привід:</strong> {ad.Car.drive_wheels}
                                    </Card.Text>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    {ad.AdPhotos && ad.AdPhotos.length > 0 ? (
                        <Carousel className='photoCarousel'>
                            {ad.AdPhotos.map((photo, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        style={{borderRadius: '3%'}}
                                        className="d-block w-100 ad-image"
                                        src={`${process.env.REACT_APP_API_URL}/${photo.file_name}`}
                                        alt={`Фото ${index + 1}`}
                                        onError={(e) => { e.target.src = '/default_image.jpg'; }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    ) : (
                        <div>Фото не знайдено</div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default AdPage;
