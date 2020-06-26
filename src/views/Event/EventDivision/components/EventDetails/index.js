import React from 'react';
import './index.scss';

function EventDetails(params) {
    const { title, content } = params;
    return (<div className="event-details">
        <h6 className="event-details-title">{title}</h6>
        <div className="event-details-propaganda"></div>
        <p className="event-details-content">{content}</p>
    </div>)
}

export default EventDetails;