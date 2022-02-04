import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import FirstStep from '../components/FirstStep';
import SecondStep from '../components/SecondStep';
import ThirdStep from '../components/ThirdStep';
import Login from '../components/Login';
// import NotFound from '../components/NotFound';

const AppRouter = () => {
    const [user, setUser] = useState({});

    const updateUser = (data) => {
        setUser((prevUser) => ({ ...prevUser, ...data }));
    };

    const resetUser = () => {
        setUser({});
    };

    return (
        <div className="container">
            <Header />
            <Routes>
                <Route exact path="/" element={<FirstStep user={user} updateUser={updateUser} />} />
                <Route path="/second" element={<SecondStep user={user} updateUser={updateUser} />} />
                <Route path="/third" element={<ThirdStep user={user} resetUser={resetUser} />} />
                <Route path="/login" element={<Login />} />
                <Route path='*' element={<FirstStep user={user} updateUser={updateUser} />} />
            </Routes>
        </div>
    )
};

export default AppRouter;