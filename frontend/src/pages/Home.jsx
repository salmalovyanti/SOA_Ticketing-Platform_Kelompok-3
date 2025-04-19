import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import api from '../api/axios';
import '../styles/home.css'; // Asumsikan kamu punya ini

const Home = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get('/api/event');
                setEvents(res.data); // Asumsikan res.data adalah array event
            } catch (err) {
                console.error('Gagal memuat event:', err);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <Navbar />
            <header className="hero">
                <h1>Satu Platform, Semua Event!</h1>
            </header>
            <section className="section">
                <h2>Jangan Lewatkan!</h2>
                <div className="event-grid">
                    {events.map((event) => (
                        <EventCard
                            key={event.event_id}
                            title={event.event_name}
                            date={new Date(event.event_date).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            })}
                            location={event.venue}
                            eventId={event.event_id}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
