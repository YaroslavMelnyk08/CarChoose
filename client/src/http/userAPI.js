import { $authHost, $host } from "./index";
import { jwtDecode } from 'jwt-decode'

export const registration = async (first_name, last_name, patronymic, email, phone_number, password) => {
    const {data} = await $host.post('api/user/registration', {first_name, last_name, patronymic, email, phone_number, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}