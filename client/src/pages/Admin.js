import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';
import { CREATE_AD_ROUTE, USER_ADS, EDIT_PROFILE } from '../utils/consts';

const Admin = ({ userId }) => {
    const navigate = useNavigate()

    return (
        <Container className='Container'>
            <h4>Змінити інформацію про себе</h4>
            <Button onClick={() => navigate(EDIT_PROFILE)}>
                Змінити інформацію
            </Button>
            <h4 className='mt-3 mb-2'>Додати оголошення</h4>
            <Button onClick={() => navigate(CREATE_AD_ROUTE)}>
                Додати оголошення
            </Button>
            <h4 className='mt-3 mb-2'>Переглянути власні оголошення</h4>
            <Button onClick={() => navigate(`${USER_ADS}/${userId}`)}>
                Переглянути власні оголошення
            </Button>
        </Container>
    );
};

export default Admin;