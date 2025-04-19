import React, { useEffect, useState } from 'react';
import '../styles/navbar.css';

// Komponen Navbar untuk navigasi dan tombol autentikasi
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Mengambil data login dari localStorage
  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName');
    setIsLoggedIn(status);
    setUserName(name);
  }, []);

  // Fungsi untuk logout dan redirect ke halaman login
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    window.location.href = '/login';
  };

  // Struktur tampilan Navbar
  return (
    <nav className="navbar">
      <div className="logo">Tikeroo</div>
      <ul className="menu">
        <li>Musik</li>
        <li>Olahraga</li>
        <li>Wisata</li>
        <li>Kuliner</li>
        <li>Teater</li>
        <li>Seminar</li>
      </ul>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <>
            <span className="welcome-msg">Selamat datang, {userName}!</span>
            <button className="btn" onClick={handleLogout}>Keluar</button>
          </>
        ) : (
          <>
            <button className="btn" onClick={() => window.location.href = '/register'}>Daftar</button>
            <button className="btn" onClick={() => window.location.href = '/login'}>Masuk</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
