import React, { useContext } from 'react';
import { Context } from '..';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, CREATE_AD_ROUTE, CREATE_CAR_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { observer } from "mobx-react-lite";
import '../styles/NavBar.css'
import '../styles/App.css'

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar className='NavBar mb-5'>
            <Container className='Container'>
                <Button className='NavButton NavButton-title'onClick={() => navigate(MAIN_ROUTE)} >CarChoose</Button>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <Button className='NavButton' onClick={() => navigate(CREATE_CAR_ROUTE)}>Додати автомобіль</Button>
                        <Button className='NavButton' onClick={() => navigate(ADMIN_ROUTE)}>Адмін панель</Button>
                        <Button className='NavButton' onClick={() => navigate(ADMIN_ROUTE)}>Обліковий запис</Button>
                        <Button className='NavButton ms-2' onClick={() => logOut()}
                        >Вийти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button className='NavButton' onClick={() => navigate(LOGIN_ROUTE)}>Продати авто</Button>
                        <Button className='NavButton' onClick={() => navigate(LOGIN_ROUTE)}>Авторизуватися</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;
