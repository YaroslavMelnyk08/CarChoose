import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { createCar } from '../http/adAPI';

const CreateCar = () => {
    const [car, setCar] = useState({
        make: '',
        model: '',
        generation: '',
        year_from: '',
        year_to: '',
        series: '',
        trim: '',
        body_type: '',
        number_of_seats: '',
        engine_type: '',
        capacity_cm3: '',
        engine_hp: '',
        drive_wheels: '',
        number_of_gears: '',
        transmission: ''
    });

    const handleChange = (e) => {
        setCar({
            ...car,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdCar = await createCar({
                make: car.make,
                model: car.model,
                generation: car.generation,
                year_from: car.year_from,
                year_to: car.year_to,
                series: car.series,
                trim: car.trim,
                body_type: car.body_type,
                number_of_seats: car.number_of_seats,
                engine_type: car.engine_type,
                capacity_cm3: car.capacity_cm3,
                engine_hp: car.engine_hp,
                drive_wheels: car.drive_wheels,
                number_of_gears: car.number_of_gears,
                transmission: car.transmission
            });
            setCar({
                make: '',
                model: '',
                generation: '',
                year_from: '',
                year_to: '',
                series: '',
                trim: '',
                body_type: '',
                number_of_seats: '',
                engine_type: '',
                capacity_cm3: '',
                engine_hp: '',
                drive_wheels: '',
                number_of_gears: '',
                transmission: ''
            });
            console.log('Car created:', createdCar);
        } catch (error) {
            console.error('Failed to create car:', error);
        }
    };

    return (
        <Container className='Container'>
            <h2>Додати Авто</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formMake">
                    <Form.Label>Марка</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введіть марку"
                        name="make"
                        value={car.make}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formModel">
                    <Form.Label>Модель</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введіть модель"
                        name="model"
                        value={car.model}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formGeneration">
                    <Form.Label>Покоління</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введіть покоління"
                        name="generation"
                        value={car.generation}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formYearFrom">
                    <Form.Label>Рік від</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введіть рік від"
                        name="year_from"
                        value={car.year_from}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formYearTo">
                    <Form.Label>Рік до</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введіть рік до"
                        name="year_to"
                        value={car.year_to}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formSeries">
                    <Form.Label>Серія</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введіть серію"
                        name="series"
                        value={car.series}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formTrim">
                    <Form.Label>Комплектація</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введіть комплектацію"
                        name="trim"
                        value={car.trim}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBodyType">
                    <Form.Label>Тип кузова</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введіть тип кузова"
                        name="body_type"
                        value={car.body_type}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formNumberOfSeats">
                    <Form.Label>Кількість місць</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введіть кількість місць"
                        name="number_of_seats"
                        value={car.number_of_seats}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formEngineType">
                    <Form.Label>Тип двигуна</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введіть тип двигуна"
                        name="engine_type"
                        value={car.engine_type}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formCapacityCm3">
                    <Form.Label>Об'єм двигуна (см³)</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введіть об'єм двигуна"
                        name="capacity_cm3"
                        value={car.capacity_cm3}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formEngineHp">
                    <Form.Label>Потужність двигуна (к.с.)</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введіть потужність двигуна"
                        name="engine_hp"
                        value={car.engine_hp}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formDriveWheels">
                    <Form.Label>Привід</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введіть привід"
                        name="drive_wheels"
                        value={car.drive_wheels}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formNumberOfGears">
                    <Form.Label>Кількість передач</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введіть кількість передач"
                        name="number_of_gears"
                        value={car.number_of_gears}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formTransmission">
                    <Form.Label>Трансмісія</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Введіть трансмісію"
                        name="transmission"
                        value={car.transmission}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3" onClick={handleSubmit}>
                    Додати Авто
                </Button>
            </Form>
        </Container>
    );
};

export default CreateCar;
