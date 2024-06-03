import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchProfile, updateProfile } from '../http/userAPI';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import { ADMIN_ROUTE } from '../utils/consts';

const EditProfile = observer(() => {
    const { user } = useContext(Context);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchProfile();
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setPatronymic(data.patronymic);
                setEmail(data.email);
                setPhoneNumber(data.phone_number);
            } catch (e) {
                alert(e.response.data.message);
            }
        };
        getUserData();
    }, []);

    const click = async () => {
        try {
            const data = await updateProfile(firstName, lastName, patronymic, email, phoneNumber, password);
            user.setUser(data);
            alert('Профіль оновлено успішно');
            navigate(ADMIN_ROUTE);  
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">Оновлення профілю</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className='mt-3' placeholder="Введіть прізвище" value={lastName} onChange={e => setLastName(e.target.value)} />
                    <Form.Control className='mt-3' placeholder="Введіть ім'я" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <Form.Control className='mt-3' placeholder="Введіть по-батькові" value={patronymic} onChange={e => setPatronymic(e.target.value)} />
                    <Form.Control className='mt-3' placeholder="Введіть номер телефону" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                    <Form.Control className='mt-3' placeholder="Введіть email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Control className='mt-3' placeholder="Введіть пароль" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <Row className='d-flex justify-content-center mt-3'>
                        <Button className='align-self-end' onClick={click}>Оновити</Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default EditProfile;
