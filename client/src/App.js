import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import { jwtDecode } from 'jwt-decode'
import './styles/App.css';
import Footer from "./components/Footer";

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedUser = jwtDecode(token);
            user.setUser(decodedUser);
            user.setIsAuth(true);
            user.setUserId(decodedUser.id);
            if (decodedUser.role === "ADMIN") {
                user.setIsAdmin(true);
            }
        } else {
            user.setIsAuth(false);
        }
        setLoading(false);
    }, [user]);

    useEffect(() => {
        if (user.isAuth) {
            check().then(data => {
                user.setUser(data);
                user.setIsAuth(true);
                user.setUserId(data.id);
            }).catch(() => {
                user.setIsAuth(false);
                localStorage.removeItem('token');
            }).finally(() => setLoading(false));
        }
    }, [user]);

    if (loading) {
        return <Spinner animation={'grow'}></Spinner>;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
            <Footer />
        </BrowserRouter>
    );
});

export default App;
