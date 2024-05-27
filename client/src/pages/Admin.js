import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';
import { CREATE_CAR_ROUTE, CREATE_AD_ROUTE } from '../utils/consts';

const Admin = () => {
    const navigate = useNavigate()

    return (
        <Container>
            <h4>Змінити інформацію про себе</h4>
            <Button onClick={() => navigate(CREATE_CAR_ROUTE)}>
                Змінити інформацію
            </Button>
            {/* <h4 className='mt-3 mb-2'>Додати автомобіль</h4>
            <Button onClick={() => navigate(CREATE_CAR_ROUTE)}>
                Додати автомобіль
            </Button> */}
            <h4 className='mt-3 mb-2'>Додати оголошення</h4>
            <Button onClick={() => navigate(CREATE_CAR_ROUTE)}>
                Додати оголошення
            </Button>
            <h4 className='mt-3 mb-2'>Переглянути власні оголошення</h4>
            <Button onClick={() => navigate(CREATE_AD_ROUTE)}>
                Переглянути власні оголошення
            </Button>
            <h4 className='mt-3 mb-2'>Керувати оголошенням</h4>
            <Button onClick={() => navigate(CREATE_AD_ROUTE)}>
                Керувати оголошенням
            </Button>
        </Container>
    );
};

export default Admin;