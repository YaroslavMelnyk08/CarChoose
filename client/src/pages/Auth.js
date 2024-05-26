import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [patronymic, setPatronymic] = useState('') 
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(firstName, lastName, patronymic, email, phoneNumber, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            user.setUserId(data.id) 
            console.log('User ID:', data.id);
            navigate(MAIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизація" : "Реєстрація"}</h2>
                <Form className="d-flex flex-column">
                    {isLogin ? 
                        <div>
                            <Form.Control 
                                className='mt-3'
                                placeholder='Введіть email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Control 
                                className='mt-3'
                                placeholder='Введіть пароль'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type='password'
                            />
                        </div>
                        : 
                        <div>
                            <Form.Control 
                                className='mt-3'
                                placeholder="Введіть прізвище"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <Form.Control 
                                className='mt-3'
                                placeholder="Введіть ім'я"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <Form.Control 
                                className='mt-3'
                                placeholder="Введіть по-батькові"
                                value={patronymic}
                                onChange={e => setPatronymic(e.target.value)}
                            />
                            <Form.Control 
                                className='mt-3'
                                placeholder='Введіть номер телефону'
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                            />
                            <Form.Control 
                                className='mt-3'
                                placeholder='Введіть email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Control 
                                className='mt-3'
                                placeholder='Введіть пароль'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type='password'
                            />
                        </div>
                    }
                    <Row className='d-flex justify-content-between mt-3'>
                        <Button 
                            className='align-self-end'
                            onClick={click}
                        >
                            {isLogin ? 'Log in' : 'Sign up'}
                        </Button>
                        {isLogin ?
                        <div>Don't have account <NavLink to={REGISTRATION_ROUTE}>Sign UP</NavLink></div>
                        : <div>Have account <NavLink to={LOGIN_ROUTE}>Log IN</NavLink></div>
                        }
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;