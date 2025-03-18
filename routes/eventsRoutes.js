const express = require('express');
const db = require('../db');
const router = express.Router();

 // CREATE events (POST)
 router.post('/events', (req, res) => {
    const { event_name, description, event_date, location_id, category_id, venue, total_tickets, created_at } = req.body;

    const sql = `INSERT INTO events (event_name, description, event_date, location_id, category_id, venue, total_tickets, created_at) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [event_name, description, event_date, location_id, category_id, venue, total_tickets, created_at], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send({ event_id: result.insertId, event_name, description, event_date, location_id, category_id, venue, total_tickets, created_at });
    }); 
});

// READ all events (GET)
router.get('/events', (req, res) => {
    const sql = `SELECT * FROM events`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(results);
    });
});

// READ by event_id (GET)
router.get('/events/:event_id', (req, res) => {
    const sql = `SELECT * FROM events WHERE event_id = ?`;
    db.query(sql, [req.params.event_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send({ message: 'events not found' });
        }
        res.status(200).send(result[0]);
    });
});

// READ events by kategori (GET)
router.get('/events/category/:category_id', (req, res) => {
    const sql = `
        SELECT events.*, categories.category_name
        FROM events 
        JOIN categories ON events.category_id = categories.category_id
        WHERE categories.category_id = ?
        ORDER BY events.event_date ASC
    `;
    db.query(sql, [req.params.category_id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(results);
    });
});

// READ all events grouped by kategori
router.get('/events/grouped', (req, res) => {
    const sql = `
        SELECT categories.category_name, JSON_ARRAYAGG(
            JSON_OBJECT(
                'event_id', events.event_id,
                'event_name', events.event_name,
                'event_date', events.event_date,
                'lokasi_id', events.lokasi_id,
                'category_id', events.category_id
            )
        ) as events
        FROM categories
        LEFT JOIN events ON categories.category_id = events.category_id
        GROUP BY categories.category_id
        ORDER BY categories.category_id ASC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(results);
    });
});

// UPDATE events by event_id (PUT)
router.put('/events/:event_id', (req, res) => {
    const { event_id, event_name, description, event_date, venue, 
        total_tickets, created_at } = req.body;
    const sql = `UPDATE events SET event_id = ?, event_name = ?, description = ?,  event_date = ?,
    venue = ?, total_tickets = ?, created_at = ? WHERE event_id = ?`;
    db.query(sql, [event_id, event_name, description, event_date, venue, 
        total_tickets, created_at, req.params.event_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'events not found' });
        }
        res.status(200).send({ event_id: req.params.event_id, event_name, description, event_date, 
            venue, total_tickets, created_at });
    });
});

// DELETE events by event_id (DELETE)
router.delete('/events/:event_id', (req, res) => {
    const sql = `DELETE FROM events WHERE event_id = ?`;
    db.query(sql, [req.params.event_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'events not found' });
        }
        res.status(200).send({ message: 'events deleted successfully' });
    });
});

module.exports = router;