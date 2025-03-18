const express = require('express');
const db = require('../db');
const router = express.Router();

// READ all categories (GET) -> Navigation Bar Menu
router.get('/categories', (req, res) => {
    const sql = `SELECT * FROM categories`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(results);
    });
});

module.exports = router;