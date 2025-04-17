import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import '../styles/eventDetail.css'; // kamu bisa sesuaikan stylenya

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error('Gagal memuat detail event:', err);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="event-detail-container">
        <div className="event-header">
          <h1>{event.event_name}</h1>
          <p><strong>Penyelenggara:</strong> {event.organizer || "Belum diketahui"}</p>
        </div>
        <div className="event-main">
          <div className="event-info">
            <p><strong>Harga:</strong> Rp{event.min_price} - Rp{event.max_price}</p>
            <p><strong>Tanggal:</strong> {new Date(event.event_date).toLocaleString('id-ID')}</p>
            <p><strong>Lokasi:</strong> {event.venue}</p>
            <p>{event.location_detail}</p>
            {/* Kalau ada iframe peta */}
            {event.venue && (
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(event.venue)}&z=15&output=embed`}
                width="100%"
                height="300"
                allowFullScreen
                loading="lazy"
              />
            )}
          </div>
          <div className="event-description">
            <h3>Deskripsi</h3>
            <p>{event.description || "Tidak ada deskripsi."}</p>
            <button className="btn-beli">Beli Tiket</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
