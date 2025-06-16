import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminHome from './pages/AdminHome';
import EventDetailPage from './pages/EventDetailPage'; // <--- Tambah ini
import PrivateRoute from './utils/PrivateRoute';


// Komponen utama aplikasi (routing halaman)
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminHome /></PrivateRoute>} />
        <Route path="/events/:id" element={<PrivateRoute><EventDetailPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
