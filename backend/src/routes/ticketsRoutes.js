const express = require('express');
const db = require('../../db');
const router = express.Router();

// CREATE Tiket (POST)
router.post('/tickets', (req, res) => {
    const { event_id, ticket_type, price, stock, version_number } = req.body;
    const sql = 'INSERT INTO tickets (event_id, ticket_type, price, stock, version_number, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
    db.query(sql, [event_id, ticket_type, price, stock, version_number], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Ticket added successfully', ticketId: result.insertId });
        }
    });
});

// READ all Tiket (GET)
router.get('/tickets', (req, res) => {
    const sql = `SELECT * FROM tickets`;
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// GET Tiket berdasarkan ID
router.get('/tickets/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM orders WHERE ticket_id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
});

// Update Tiket (PUT)
router.put('/tickets/:id', (req, res) => {
    const { id } = req.params;
    const { event_id, ticket_type, price, stock, version_number } = req.body;
    const sql = 'UPDATE tickets SET event_id = ?, ticket_type = ?, price = ?, stock = ?, version_number = ? WHERE ticket_id = ?';
    db.query(sql, [event_id, ticket_type, price, stock, version_number, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Ticket updated successfully' });
        }
    });
});

// DELETE Hapus Tiket
router.delete('/tickets/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM tickets WHERE ticket_id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Ticket deleted successfully' });
        }
    });
});

module.exports = router;