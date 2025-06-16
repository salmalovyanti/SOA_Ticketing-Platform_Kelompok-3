import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Navbar from '../components/Navbar';
import Scanner from '../components/Scanner';

const socket = io('http://localhost:3002'); // Koneksi ke Kafka worker via Socket.IO

const AdminHome = () => {
  const [lastScan, setLastScan] = useState(null);
  const [notifMsg, setNotifMsg] = useState(null); // Menyimpan pesan dari Kafka

  // Fungsi pemrosesan hasil scan
  const handleScan = async (ticketCode) => {
    try {
      const res = await fetch(`http://localhost:3000/api/ticket/scan-ticket?ticket_code=${ticketCode}`);
      const json = await res.json();

      // Hanya set data jika tiket valid
      if (res.ok) setLastScan(json);
    } catch (err) {
      console.error('❌ Error saat kirim scan:', err);
    }
  };

  // Dengarkan notifikasi dari Kafka
  useEffect(() => {
    socket.on('notif_alert', (data) => {
      console.log('[Socket] Dapat notifikasi:', data);
      setNotifMsg(data.message);
    });

    return () => {
      socket.off('notif_alert');
    };
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="section">
        {/* Kamera QR Reader */}
        <div id="reader-wrapper">
          <div id="reader"></div>
          <Scanner onResult={handleScan} />
          <p className="scanner-hint">Arahkan barcode ke kamera</p>
        </div>

        {/* Teks Kanan + Notifikasi */}
        <div className="right-text-wrapper">
          <div className="right-text">Scan Barcode</div>

          {notifMsg && (
            <div
              className={`notif-box ${notifMsg.includes('Berhasil') ? 'notif-success' : 'notif-error'}`}>
              <strong>🔔 {notifMsg.split(':')[0]}</strong>
              <br />
              {notifMsg.split(':')[1]?.trim()}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminHome;