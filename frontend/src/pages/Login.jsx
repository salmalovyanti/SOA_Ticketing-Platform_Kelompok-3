import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/axios';
import '../styles/login.css';
import '../styles/navbar.css';

// Komponen utama untuk halaman Login
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Fungsi submit Login
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Trying login with:", email, password);
            const data = await loginUser({ email, password }); // simpan hasilnya di variabel
            console.log("Login response:", data); // cek datanya

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', data.user.user_id);
            localStorage.setItem('userName', data.user.name); // pastikan backend kirim user

            navigate('/');
        } catch (err) {
            console.log(err.response?.data); // Bantu debug error dari backend
            setError('Email atau password salah');
        }
    };

    // Struktur tampilan Login
    return (
        <div className="login-area">
            <nav className="navbar">
                <div className="logo">Tikeroo</div>
            </nav>
            <div className="login-section">
                <h2>Masuk ke Akunmu</h2>
                <div>
                    <div className="login-box">
                        <form onSubmit={handleSubmit}>
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Masukkan email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Masukkan password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <a href="#" className="forgot">Lupa Password?</a>
                            {error && <p className="error">{error}</p>}
                            <button type="submit">Masuk</button>
                        </form>
                        
                    </div>
                    
                </div>
            </div>

        </div>
    );

};

export default Login;
