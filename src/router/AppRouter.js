import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FirstStep from '../components/FirstStep';
import Header from '../components/Header';
import SecondStep from '../components/SecondStep';
import ThirdStep from '../components/ThirdStep';

const AppRouter = () => (
    <div className="container">
        <Header />
        <Routes>
            <Route exact path="/" element={<FirstStep />} />
            <Route path="/second" element={<SecondStep />} />
            <Route path="/third" element={<ThirdStep />} />
        </Routes>
    </div>
);

export default AppRouter;