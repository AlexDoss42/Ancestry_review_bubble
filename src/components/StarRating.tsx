import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './StarRating.css';

const StarRating = ({ experience_rating, setSurveyData, surveyData }): JSX.Element => {
    const [hover, setHover] = useState<number>(null);
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i+1;
                return (
                    <label key={ratingValue}>
                        <input 
                            type="radio" 
                            name="rating" 
                            value={ratingValue} 
                            onClick={() => setSurveyData({...surveyData, experience_rating: ratingValue})} 
                            
                        />
                        <FaStar 
                            className='star' 
                            color={ratingValue <= (hover || experience_rating) ? "#ffc107" : "#e4e5e9"} 
                            onMouseEnter={() => setHover(ratingValue)} 
                            onMouseOut={() => setHover(null)}
                            size={50}
                        />
                    </label>
                )
            })}
        </div>
    )
}

export default StarRating;