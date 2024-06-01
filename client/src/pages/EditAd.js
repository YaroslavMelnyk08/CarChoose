import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOneAd, updateAd } from '../http/adAPI';
import { Form, Button, Container } from 'react-bootstrap';
import { USER_ADS } from '../utils/consts';

const EditAd = () => {
    const { id } = useParams();
    const [ad, setAd] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchOneAd(id)
            .then(data => setAd(data))
            .catch(error => {
                console.error("Error fetching ad details:", error.message);
            });
    }, [id]);

    const handleChange = (e) => {
        setAd({ ...ad, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAd(id, ad);
            navigate(USER_ADS);
        } catch (error) {
            console.error("Error updating ad:", error.message);
        }
    };

    return (
        <Container>
            <h2>Редагувати оголошення</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Назва</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={ad.title || ''}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formDescription" className="mt-3">
                    <Form.Label>Опис</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={ad.description || ''}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formYear" className="mt-3">
                    <Form.Label>Рік випуску</Form.Label>
                    <Form.Control
                        type="text"
                        name="year_of_manufacture"
                        value={ad.year_of_manufacture || ''}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formMileage" className="mt-3">
                    <Form.Label>Пробіг</Form.Label>
                    <Form.Control
                        type="number"
                        name="mileage"
                        value={ad.mileage || ''}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formPrice" className="mt-3">
                    <Form.Label>Ціна</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={ad.price || ''}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="mt-3" type="submit">
                    Зберегти зміни
                </Button>
            </Form>
        </Container>
    );
};

export default EditAd;