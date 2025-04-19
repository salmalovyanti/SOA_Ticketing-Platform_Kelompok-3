import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import { saveOrderOffline } from '../utils/offlineHandler';
import '../styles/eventDetail.css';

// Komponen utama halaman detail event
const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [placeInfo, setPlaceInfo] = useState(null);

// Fetch data event dari backend saat halaman dimuat
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/api/event/${id}`);
        setEvent(res.data);

        // Fetch place info dari backend
        if (res.data.venue) {
          const mapRes = await api.get('/api/google/maps/search', {
            params: { place: res.data.venue }
          });

          const place = mapRes.data?.results?.[0];
          if (place) setPlaceInfo(place);
        }

      } catch (err) {
        console.error('Gagal memuat detail event:', err);
      }
    };

    fetchEvent();
  }, [id]);

  // Menangani pemesanan tiket, termasuk mode offline
  const handleOrder = async () => {
    const userId = localStorage.getItem('userId'); // Ambil user_id dari localStorage

    // Cek apakah user sudah login
    if (!userId) {
      alert("Kamu harus login terlebih dahulu.");
      return;
    }

    const orderData = {
      event_id: id,
      quantity: 1, // kuantitas default
      user_id: userId, 
    };

    try {
      await api.post('/api/orders', orderData);
      alert('Tiket berhasil dibeli!');
    } catch (error) {
      if (!navigator.onLine) {
        await saveOrderOffline(orderData); // simpan ke IndexedDB / localStorage
        const reg = await navigator.serviceWorker.ready;
        reg.sync.register('sync-orders'); // trigger sync
        alert("Kamu sedang offline. Pesanan akan dikirim saat online.");
      } else {
        alert('Terjadi kesalahan saat memesan tiket.');
        console.error(error);
      }
    }
  };

  // Tampilan loading saat data belum tersedia
  if (!event) return <div>Loading...</div>;

  // Struktur tampilan detail event
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
            <p><strong>Venue:</strong> {event.venue?.venue_name}</p>
            <p>{event.venue?.location?.location_name}</p>

            {placeInfo ? (
              <>
                <p><strong>{placeInfo.name}</strong></p>
                <p>{placeInfo.formatted_address}</p>
                <p>Rating: {placeInfo.rating}</p>
                <iframe
                  src={`https://maps.google.com/maps?q=${placeInfo.geometry.location.lat},${placeInfo.geometry.location.lng}&z=15&output=embed`}
                  width="100%"
                  height="300"
                  allowFullScreen
                  loading="lazy"
                  title="Google Maps"
                />
              </>
            ) : (
              // fallback iframe kalau placeInfo belum tersedia
              event.venue && (
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(event.venue?.venue_name)}&z=15&output=embed`}
                  width="100%"
                  height="300"
                  allowFullScreen
                  loading="lazy"
                  title="Google Maps Fallback"
                />
              )
            )}
          </div>

          <div className="event-description">
            <h3>Deskripsi</h3>
            <p>{event.description || "Tidak ada deskripsi."}</p>
            <button className="btn-beli" onClick={handleOrder}>
              Beli Tiket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
