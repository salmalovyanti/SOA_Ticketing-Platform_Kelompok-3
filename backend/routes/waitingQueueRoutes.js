const express = require('express');
const router = express.Router();
const db = require('../db'); // Pastikan ada file db.js untuk koneksi database

// CREATE: Tambah antrean baru (POST)
router.post('/queue', (req, res) => {
    const { user_id, event_id, position, status } = req.body;
    const sql = `INSERT INTO waiting_queue (user_id, event_id, position, status) VALUES (?, ?, ?, ?)`;
    db.query(sql, [user_id, event_id, position, status || 'waiting'], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ queue_id: result.insertId, user_id, event_id, position, status: status || 'waiting' });
    });
});

// READ: Ambil semua antrean (GET)
router.get('/queue', (req, res) => {
    db.query(`SELECT * FROM waiting_queue`, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

// READ: Ambil antrean berdasarkan queue_id (GET)
router.get('/queue/:queue_id', (req, res) => {
    db.query(`SELECT * FROM waiting_queue WHERE queue_id = ?`, [req.params.queue_id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send({ message: 'Queue not found' });
        res.status(200).send(result[0]);
    });
});

// UPDATE: Perbarui status antrean berdasarkan queue_id (PUT)
router.put('/queue/:queue_id', (req, res) => {
    const { position, status } = req.body;
    const sql = `UPDATE waiting_queue SET position = ?, status = ? WHERE queue_id = ?`;
    db.query(sql, [position, status, req.params.queue_id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'Queue not found' });
        res.status(200).send({ message: 'Queue updated successfully' });
    });
});

// DELETE: Hapus antrean berdasarkan queue_id (DELETE)
router.delete('/queue/:queue_id', (req, res) => {
    db.query(`DELETE FROM waiting_queue WHERE queue_id = ?`, [req.params.queue_id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'Queue not found' });
        res.status(200).send({ message: 'Queue deleted successfully' });
    });
});

module.exports = router;
