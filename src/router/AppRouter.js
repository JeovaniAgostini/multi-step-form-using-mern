import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import FirstStep from '../components/FirstStep';
import Header from '../components/Header';
import SecondStep from '../components/SecondStep';
import ThirdStep from '../components/ThirdStep';

const AppRouter = () => {
    const [user, setUser] = useState({});

    const updateUser = (data) => {
        setUser((prevUser) => ({ ...prevUser, ...data }));
    };

    // const resetUser = () => {
    //     setUser({});
    // };

    return (
        <div className="container">
            <Header />
            <Routes>
                <Route exact path="/" element={<FirstStep user={user} updateUser={updateUser} />} />
                <Route path="/second" element={<SecondStep user={user} updateUser={updateUser} />} />
                <Route path="/third" element={<ThirdStep user={user} />} />
            </Routes>
        </div>
    )
};

export default AppRouter;