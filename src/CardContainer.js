import React from 'react';
import GetTemperatureInformation from './GetTemperatureInformation';
import './CardContainer.css';

function CardContainer() {
    const cities = [
        { city: 'New York', title: 'ניו יורק' },
        { city: 'London', title: 'לונדון' },
        { city: 'Eilat', title: 'אילת' },
        { city: 'Alaska', title: 'אלסקה' }
    ];

    return (
        <div className="card-grid">
            {cities.map((item, index) => (
                <GetTemperatureInformation
                    key={index}
                    city={item.city}
                    title={item.title}
                />
            ))}
        </div>
    );
}

export default CardContainer;
