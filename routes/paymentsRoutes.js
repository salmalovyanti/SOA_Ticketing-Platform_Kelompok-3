const express = require('express');
const router = express.Router();
const db = require('../db'); // Pastikan ada file db.js untuk koneksi database

// CREATE payment (POST)
router.post('/payments', (req, res) => {
    const { order_id, transaction_id, amount_paid, payment_method, payment_status, payment_gateway_response, paid_at } = req.body;
    const sql = `INSERT INTO payments (order_id, transaction_id, amount_paid, payment_method, payment_status, payment_gateway_response, paid_at) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [order_id, transaction_id, amount_paid, payment_method, payment_status, JSON.stringify(payment_gateway_response), paid_at], 
    (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ payment_id: result.insertId, order_id, transaction_id, amount_paid, payment_method, payment_status, paid_at });
    });
});

// READ all payments (GET)
router.get('/payments', (req, res) => {
    db.query(`SELECT * FROM payments`, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

// READ single payment by payment_id (GET)
router.get('/payments/:payment_id', (req, res) => {
    db.query(`SELECT * FROM payments WHERE payment_id = ?`, [req.params.payment_id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send({ message: 'Payment not found' });
        res.status(200).send(result[0]);
    });
});

// UPDATE payment by payment_id (PUT)
router.put('/payments/:payment_id', (req, res) => {
    const { transaction_id, amount_paid, payment_method, payment_status, payment_gateway_response, paid_at } = req.body;
    const sql = `UPDATE payments SET transaction_id = ?, amount_paid = ?, payment_method = ?, payment_status = ?, payment_gateway_response = ?, paid_at = ? 
                 WHERE payment_id = ?`;
    db.query(sql, [transaction_id, amount_paid, payment_method, payment_status, JSON.stringify(payment_gateway_response), paid_at, req.params.payment_id], 
    (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'Payment not found' });
        res.status(200).send({ message: 'Payment updated successfully' });
    });
});

// DELETE payment by payment_id (DELETE)
router.delete('/payments/:payment_id', (req, res) => {
    db.query(`DELETE FROM payments WHERE payment_id = ?`, [req.params.payment_id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'Payment not found' });
        res.status(200).send({ message: 'Payment deleted successfully' });
    });
});

module.exports = router;