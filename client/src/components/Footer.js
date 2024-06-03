import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/consts';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/NavBar.css'
import '../styles/App.css'

const Footer = () => {
    const navigate = useNavigate();

    return (
        <Navbar className='NavBar mt-5'>
            <Container className='Container'>
                <Button className='NavButton NavButton-title'onClick={() => navigate(MAIN_ROUTE)} >CarChoose</Button>
                <Button className='NavButton NavButton-title'onClick={() => navigate(MAIN_ROUTE)} >@ 2024 CarChoose, Всі права захищено</Button>
            </Container>
        </Navbar>
    );
};

export default Footer;