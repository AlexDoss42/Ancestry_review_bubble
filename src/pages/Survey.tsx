import React, { useState, useContext } from 'react';
import { PageContext } from '../Contexts/PageContext';
import StarRating from '../components/StarRating';
import CountrySelector from '../components/CountrySelector';

const Survey = () => {
    const { origin_page } = useContext(PageContext);
    const [displayCountry, setDisplayCountry] = useState<displayCountryInterface>({
        value: '',
        label: ''
    });
    const [surveyData, setSurveyData] = useState<surveyDataInterface>({
        customer_name: '',
        email: '',
        age: '',
        gender: '',
        country: '',
        experience_rating: 0,
        suggested_improvements: '',
        origin_page: origin_page
    })

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = surveyData;
            await fetch("http://localhost:5000/api/survey", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location.href = "/thankyou";
        } catch (error) {
            console.error(error.message);
        }
    }

    const countryHandler = country => {
        const { label } = country;
        console.log(213, country)
        setDisplayCountry(country);
        setSurveyData({...surveyData, country: label});
      }

    return (
        <div>
            <h1>Thank you for helping us improve the site for you!</h1>
            
            <form onSubmit={onSubmitForm}>
                <p>Name *REQUIRED</p>
                    <input type='text' value={surveyData.customer_name} required onChange={e => setSurveyData({...surveyData, customer_name: e.target.value})}/>

                <p>Email *REQUIRED</p>
                    <input type='email' required value={surveyData.email} onChange={e => setSurveyData({...surveyData, email: e.target.value})}/>

                <p>Age</p>
                    <input type="number" value={surveyData.age} onChange={e => setSurveyData({...surveyData, age: e.target.value})}/>

                <p>Gender</p>
                    <select value={surveyData.gender} onChange={e => setSurveyData({...surveyData, gender: e.target.value})}>
                        <option value="">--Please choose an option--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="pnta">Prefer not to answer</option>
                    </select>

                <p>Country</p>
                    <CountrySelector countryHandler={countryHandler} displayCountry={displayCountry} />

                <p>Rating</p>
                    <StarRating experience_rating={surveyData.experience_rating} setSurveyData={setSurveyData} surveyData={surveyData} />
                
                <p>Suggested Improvements</p>
                    <textarea value={surveyData.suggested_improvements} onChange={e => setSurveyData({...surveyData, suggested_improvements: e.target.value})} />
                <button>Submit</button>
            </form>
        </div>
    )
};

export default Survey;

interface surveyDataInterface {
    customer_name: string,
    email: string,
    age: string,
    gender: string,
    country: string,
    experience_rating: number,
    suggested_improvements: string,
    origin_page: string
}

interface displayCountryInterface {
    value: string,
    label: string
}