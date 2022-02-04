import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Country, State, City } from 'country-state-city';
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';
import { motion } from 'framer-motion/dist/framer-motion';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ThirdStep = (props) => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        const getCountries = async () => {
            try {
                setIsLoading(true);
                const result = await Country.getAllCountries();
                let allCountries = [];
                allCountries = result?.map(({ isoCode, name }) => ({
                    isoCode,
                    name
                }));
                /* 
                Here, we've used object destructuring renaming with 
                assignment syntax. We're destructuring the isoCode 
                property from the first object of the allCountries 
                array of objects and renaming the isoCode property 
                to firstCountry just to identify that it's the first 
                country from the list.
                We're also assigning a default empty object so that 
                if the allCountries array is empty we won't get an 
                error.
                In short, we are saying to take the isoCode property 
                from the first object from the allCountries array of 
                objects and rename it to firstCountry .
                If the firstCountry property does not exist in the 
                first object from the allCountries array, then assign 
                a default value of empty object {} to the firstCountry 
                variable.
                */
                const [{ isoCode: firstCountry } = {}] = allCountries;
                setCountries(allCountries);
                setSelectedCountry(firstCountry);
                setIsLoading(false);
            } catch (error) {
                setCountries([]);
                setIsLoading(false);
            }
        };

        getCountries();
    }, []);

    useEffect(() => {
        const getStates = async () => {
            try {
                const result = await State.getStatesOfCountry(selectedCountry);
                let allStates = [];
                allStates = result?.map(({ isoCode, name }) => ({
                    isoCode,
                    name
                }));
                const [{ isoCode: firstState = '' } = {}] = allStates;
                setCities([]);
                setSelectedCity('');
                setStates(allStates);
                setSelectedState(firstState);
            } catch (error) {
                setStates([]);
                setCities([]);
                setSelectedCity('');
            }
        };

        getStates();
    }, [selectedCountry]);

    useEffect(() => {
        const getCities = async () => {
            try {
                const result = await City.getCitiesOfState(selectedCountry, selectedState);
                let allCities = [];
                allCities = result?.map(name => (
                    name
                ));
                console.log('allCities:', allCities)
                const [{ name: firstCity = '' } = {}] = allCities;
                console.log('firstCity:', firstCity);
                setCities(allCities);
                setSelectedCity(firstCity);
            } catch (error) {
                setCities([]);
            }
        };

        getCities();
    }, [selectedCountry, selectedState]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = props;
            const updatedData = {
                country: countries.find(
                    (country) => country.isoCode === selectedCountry
                )?.name,
                state:
                    states.find((state) => state.isoCode === selectedState)?.name || '',
                city: selectedCity
            };

            console.log(updatedData);

            await axios.post(`${BASE_API_URL}/register`, {
                ...user,
                ...updatedData
            });

            Swal.fire('Awesome!', "You're successfully registered!", 'success').then(
                (result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        props.resetUser();
                        navigate('/');
                    }
                }
            );
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data
                });
            }
        }
    };

    return (
        <Form className="input-form" onSubmit={handleSubmit}>
            <motion.div
                className="col-md-6 offset-md-3"
                initial={{ x: '-50vw' }}
                animate={{ x: 0 }}
                transition={{ stiffness: 150 }}
            >
                <Form.Group controlId="country">
                    {isLoading && (
                        <p className="loading">Loading countries. Please wait...</p>
                    )}
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        as="select"
                        name="country"
                        value={selectedCountry}
                        onChange={(event) => {
                            setSelectedCountry(event.target.value)
                        }}
                    >
                        {
                            countries.map(({ isoCode, name }) => (
                                <option value={isoCode} key={isoCode}>
                                    {name}
                                </option>
                            ))
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        as="select"
                        name="state"
                        value={selectedState}
                        onChange={(event) => setSelectedState(event.target.value)}
                    >
                        {states.length > 0 ? (
                            states.map(({ isoCode, name }) => (
                                <option value={isoCode} key={isoCode}>
                                    {name}
                                </option>
                            ))
                        ) : (
                            <option value="" key="">
                                No state found
                            </option>
                        )}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        as="select"
                        name="city"
                        value={selectedCity}
                        onChange={(event) => setSelectedCity(event.target.value)}
                    >
                        {cities.length > 0 ? (
                            cities.map(({ name }) => (
                                <option value={name} key={name}>
                                    {name}
                                </option>
                            ))
                        ) : (
                            <option value="" key="">
                                No city found
                            </option>
                        )}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </motion.div>
        </Form>
    );
};

export default ThirdStep;