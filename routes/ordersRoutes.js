const express = require('express');
const db = require('../db');
const router = express.Router();

// CREATE Orders (POST)
router.post('/orders', (req, res) => {
    const { user_id, total_price, order_status } = req.body;
    const sql = `INSERT INTO orders (user_id, total_price, order_status, created_at) VALUES (?, ?, ?, NOW())`;
    db.query(sql, [user_id, total_price, order_status], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Order created successfully', orderId: result.insertId });
        }
    });
});

// READ all Orders (GET)
router.get('/orders', (req, res) => {
    const sql = `SELECT * FROM orders`;
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// GET Orders berdasarkan ID
router.get('/orders/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM orders WHERE order_id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result[0]);
        }
    });
});


// Update Orders (PUT)
router.put('/orders/:id', (req, res) => {
    const { id } = req.params;
    const { user_id, total_price, order_status } = req.body;
    const sql = `UPDATE orders SET user_id = ?, total_price = ?, order_status = ? WHERE order_id = ?`;
    db.query(sql, [user_id, total_price, order_status, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Order updated successfully' });
        }
    });
});

// DELETE Hapus Orders
router.delete('/orders/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM orders WHERE order_id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Order deleted successfully' });
        }
    });
});

module.exports = router;