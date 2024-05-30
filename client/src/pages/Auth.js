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
import '../styles/Auth.css'

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
            if (data.role === "ADMIN"){
                user.setIsAdmin(true)
            }
            navigate(MAIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 154}}
        >
            <Card style={{width: 600}} className="authCard p-5">
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
                    <Row className='d-flex justify-content-center mt-3'>
                        <Button 
                            className='align-self-end md-3 btnAuth'
                            onClick={click}
                        >
                            {isLogin ? 'Авторизуватися' : 'Зареєструватися'}
                        </Button>
                        <div className='underTitleBtn mt-3'>
                            {isLogin ?
                            <div>Не маєте акаунту? <NavLink className="navLinkAuth" to={REGISTRATION_ROUTE}> Зареєструйтеся</NavLink></div>
                            : <div>Маєте акаунт?<NavLink className="navLinkAuth" to={LOGIN_ROUTE}> Авторизуйтеся</NavLink></div>
                            }
                        </div>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;