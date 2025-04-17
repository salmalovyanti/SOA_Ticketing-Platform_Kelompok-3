const express = require('express');
const db = require('../../db');
const router = express.Router();

 // CREATE categories (POST)
 router.post('/categories', (req, res) => {
    const { category_name, created_at } = req.body;

    const sql = `INSERT INTO categories (category_name, created_at) 
                 VALUES (?, ?)`;

    db.query(sql, [category_name, created_at], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ category_id: result.insertId, category_name, created_at });
    }); 
});

// READ all categories (GET)
router.get('/categories', (req, res) => {
    const sql = `SELECT * FROM categories`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(results);
    });
});

// UPDATE categories by category_id (PUT)
router.put('/categories/:category_id', (req, res) => {
    const { category_id, category_name, created_at } = req.body;
    const sql = `UPDATE categories SET category_id = ?, category_name = ?, created_at = ? WHERE category_id = ?`;
    db.query(sql, [category_id, category_name, created_at, req.params.category_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'category not found' });
        }
        res.status(200).send({ category_id: req.params.category_id, category_name, created_at });
    });
});

// DELETE categories by category_id (DELETE)
router.delete('/categories/:category_id', (req, res) => {
    const sql = `DELETE FROM categories WHERE category_id = ?`;
    db.query(sql, [req.params.category_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'category not found' });
        }
        res.status(200).send({ message: 'category deleted successfully' });
    });
});
module.exports = router;