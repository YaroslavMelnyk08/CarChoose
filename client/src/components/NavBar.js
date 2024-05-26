import React, { useContext } from 'react';
import { Context } from '..';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from '../utils/consts';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar style={{ color: 'white' }} bg="light" data-bs-theme="light" className='mb-2'>
            <Container>
                <NavLink to={MAIN_ROUTE}>CarChoose</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <Button onClick={() => navigate(ADMIN_ROUTE)}>Адмін панель</Button>
                        <Button onClick={() => logOut()} className="ms-2">Вийти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button onClick={() => navigate(LOGIN_ROUTE)}>Авторизуватися</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;
