import { $authHost, $host } from "./index";
import { jwtDecode } from 'jwt-decode'

export const registration = async (first_name, last_name, patronymic, email, phone_number, password) => {
    const { data } = await $host.post('api/user/registration', { first_name, last_name, patronymic, email, phone_number, password, role: 'USER' });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const fetchProfile = async () => {
    const { data } = await $authHost.get('api/user/profile');
    return data;
};

export const updateProfile = async (first_name, last_name, patronymic, email, phone_number, password) => {
    const { data } = await $authHost.put('api/user/update', { first_name, last_name, patronymic, email, phone_number, password });
    return data;
};

export const deleteAd = async (id) => {
    const { data } = await $authHost.delete('api/ad/' + id);
    return data;
};