import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/axios';
import '../styles/login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Trying login with:", email, password);
            const data = await loginUser({ email, password }); // ✅ simpan hasilnya di variabel
            console.log("Login response:", data); // cek datanya

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', data.user.name); // pastikan backend kirim user

            navigate('/');
        } catch (err) {
            console.log(err.response?.data); // Bantu debug error dari backend
            setError('Email atau password salah');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Masuk ke Akunmu</h2>
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
    );
};

export default Login;
