// components/EventCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/eventcard.css';

const EventCard = ({ title, date, location, eventId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="event-card" onClick={handleClick}>
      <h3>{title}</h3>
      <p>{date}</p>
      <p>{location}</p>
    </div>
  );
};

export default EventCard;
