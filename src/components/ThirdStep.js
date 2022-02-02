import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Country, State, City } from 'country-state-city';
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';

const ThirdStep = (props) => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        const getCountries = async () => {
            try {
                setIsLoading(true);
                const result = await Country.getAllCountries();
                console.log('Countries: ', result);
                let allCountries = [];
                allCountries = result?.map(({ isoCode, name }) => ({
                    isoCode,
                    name
                }));
                // Here, we've used object destructuring renaming with assignment syntax. We're destructuring the isoCode property from the first object of the allCountries array of objects and renaming the isoCode property to firstCountry just to identify that it's the first country from the list.
                // We're also assigning a default empty object so that if the allCountries array is empty we won't get an error.
                // In short, we are saying to take the isoCode property from the first object from the allCountries array of objects and rename it to firstCountry .
                // If the firstCountry property does not exist in the first object from the allCountries array, then assign a default value of empty object {} to the firstCountry variable.
                const [{ isoCode: firstCountry } = {}] = allCountries;
                setCountries(allCountries);
                setSelectedCountry(firstCountry);
                setIsLoading(false);
            } catch (error) {
                setCountries([]);
                setIsLoading(false);
                console.log(error);
            }
        };

        getCountries();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    return (
        <Form className="input-form" onSubmit={handleSubmit}>
            <div className="col-md-6 offset-md-3">
                <Form.Group controlId="country">
                    {isLoading && (
                        <p className="loading">Loading countries. Please wait...</p>
                    )}
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        as="select"
                        name="country"
                        value={selectedCountry}
                        onChange={(event) => setSelectedCountry(event.target.value)}
                    >
                        {countries.map(({ isoCode, name }) => (
                            <option value={isoCode} key={isoCode}>
                                {name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </div>
        </Form>
    );
};

export default ThirdStep;