const express = require('express');
const router = express.Router();
const db = require('../../db');

// CREATE user (POST)
router.post('/users', (req, res) => {
    const { name, email, password_hash } = req.body;
    const sql = `INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`;
    db.query(sql, [name, email, password_hash], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ user_id: result.insertId, name, email });
    });
});

// READ all users (GET)
router.get('/users', (req, res) => {
    db.query(`SELECT user_id, name, email, created_at FROM users`, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(results);
    });
});

// READ single user by user_id (GET)
router.get('/users/:user_id', (req, res) => {
    db.query(`SELECT user_id, name, email, created_at FROM users WHERE user_id = ?`, 
    [req.params.user_id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send({ message: 'User not found' });
        res.status(200).send(result[0]);
    });
});

// UPDATE user by user_id (PUT)
router.put('/users/:user_id', (req, res) => {
    const { name, email, password_hash } = req.body;
    const sql = `UPDATE users SET name = ?, email = ?, password_hash = ? WHERE user_id = ?`;
    db.query(sql, [name, email, password_hash, req.params.user_id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'User not found' });
        res.status(200).send({ message: 'User updated successfully' });
    });
});

// DELETE user by user_id (DELETE)
router.delete('/users/:user_id', (req, res) => {
    db.query(`DELETE FROM users WHERE user_id = ?`, [req.params.user_id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send({ message: 'User not found' });
        res.status(200).send({ message: 'User deleted successfully' });
    });
});

module.exports = router;