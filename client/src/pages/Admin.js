import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';
import { CREATE_CAR_ROUTE, CREATE_AD_ROUTE } from '../utils/consts';

const Admin = () => {
    const navigate = useNavigate()

    return (
        <Container>
            
            <Button className='me-4' onClick={() => navigate(CREATE_CAR_ROUTE)}>
                Add car
            </Button>
            <Button onClick={() => navigate(CREATE_AD_ROUTE)}>
                Add ad
            </Button>
        </Container>
    );
};

export default Admin;