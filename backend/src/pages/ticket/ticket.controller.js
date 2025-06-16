const service = require('./ticket.service');
const { purchaseTicketSchema } = require('./ticket.validations');
const redisClient = require('../../config/redisClient');

// Handler untuk
exports.createTicket = async (req, res) => {
  try {
    const ticket = await service.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    console.error('❌ Error saat createTicket:', err);
    res.status(400).json({ error: err.message });
  }
};

// Handler untuk menampilkan seluruh data tiket
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await service.getAll();
    res.json(tickets);
  } catch (err) {
    console.error('❌ Error saat getAllTickets:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk menapilkan satu data tiket
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await service.getById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    console.error('❌ Error saat getTicketById:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk mengedit data tiket
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await service.update(req.params.id, req.body);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    console.error('❌ Error saat updateTicket:', err);
    res.status(400).json({ error: err.message });
  }
};

// Handler untuk menghapus data tiket
exports.deleteTicket = async (req, res) => {
  try {
    const deleted = await service.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Ticket not found' });
    res.status(204).send();
  } catch (err) {
    console.error('❌ Error saat deleteTicket:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk melihat tiket berdasarkan satu event
exports.getByEventId = async (req, res) => {
  try {
    const tickets = await service.getByEventId(req.params.eventId);
    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ error: 'Tickets not found for this event' });
    }
    res.status(200).json(tickets);
  } catch (err) {
    console.error('❌ Error saat getByEventId:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk membeli tiket
exports.purchaseTicket = async (req, res) => {
  try {
    // Validate request data
    const { error, value } = purchaseTicketSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Call service to process ticket purchase
    const ticketPurchase = await service.purchase(value);

    if (!ticketPurchase) {
      return res.status(400).json({ error: 'Ticket purchase failed' });
    }

    res.status(201).json(ticketPurchase);
  } catch (err) {
    console.error('❌ Error saat purchaseTicket:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk mengupload tiket dalam jumlah yang banyak
exports.bulkUploadTickets = async (req, res) => {
  try {
    const { event_id, tickets } = req.body;
    const uploadedTickets = await ticketService.bulkUploadTickets(event_id, tickets);
    return res.status(201).json({
      message: 'Tiket berhasil diunggah',
      uploaded_tickets: uploadedTickets
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Terjadi kesalahan saat mengunggah tiket'
    });
  }
};

// Handler untuk mengupload queue ke redis
exports.scanTicket = async (req, res) => {
  try {
    const { ticket_code } = req.query; 

    if (!ticket_code) return res.status(400).json({ error: 'ticket_code wajib diisi' });

    const result = await service.processScan(ticket_code);

    const notif = {
      ticket_code,
      scanned_at: new Date()
    };

    let queueMessage;

    if (result.status === 'not_found') {
      queueMessage = {
        ...notif,
        type: 'SCAN_TIKET_INVALID',
        message: `Gagal scan: Tiket (${ticket_code}) tidak ditemukan.`
      };
      await redisClient.rPush('notif_admin_queue', JSON.stringify(queueMessage));
      return res.status(404).json({ message: 'Tiket tidak ditemukan' });
    }

    if (result.status === 'used') {
      queueMessage = {
        ...notif,
        type: 'SCAN_TIKET_GAGAL',
        message: `Gagal scan: Tiket (${ticket_code}) sudah digunakan.`
      };
      await redisClient.rPush('notif_admin_queue', JSON.stringify(queueMessage));
      return res.status(400).json({ message: 'Tiket sudah digunakan' });
    }

    // Tiket valid dan belum digunakan
    queueMessage = {
      ...notif,
      type: 'SCAN_TIKET_BERHASIL',
      message: `Berhasil scan: Tiket (${ticket_code}) berhasil digunakan.`
    };
    await redisClient.rPush('notif_admin_queue', JSON.stringify(queueMessage));

    res.status(200).json({
      message: 'Tiket berhasil di-scan dan digunakan',
      status: 'success',
      ticket: result.ticket
    });

  } catch (err) {
    console.error('❌ Error saat scan tiket:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Handler untuk message broker kafka
exports.scanTicket = async (req, res) => {
  try {
    const { ticket_code } = req.query;

    if (!ticket_code) return res.status(400).json({ error: 'ticket_code wajib diisi' });

    const result = await service.processScan(ticket_code);

    const notif = {
      ticket_code,
      scanned_at: new Date()
    };

    let queueMessage;

    if (result.status === 'not_found') {
      queueMessage = {
        ...notif,
        type: 'SCAN_TIKET_INVALID',
        message: `Gagal scan: Tiket (${ticket_code}) tidak ditemukan.`
      };
      await kafkaProducer.send({
        topic: 'notif_admin_topic',
        messages: [{ value: JSON.stringify(queueMessage) }]
      });
      return res.status(404).json({ message: 'Tiket tidak ditemukan' });
    }

    if (result.status === 'used') {
      queueMessage = {
        ...notif,
        type: 'SCAN_TIKET_GAGAL',
        message: `Gagal scan: Tiket (${ticket_code}) sudah digunakan.`
      };
      await kafkaProducer.send({
        topic: 'notif_admin_topic',
        messages: [{ value: JSON.stringify(queueMessage) }]
      });
      return res.status(400).json({ message: 'Tiket sudah digunakan' });
    }

    queueMessage = {
      ...notif,
      type: 'SCAN_TIKET_BERHASIL',
      message: `Berhasil scan: Tiket (${ticket_code}) berhasil digunakan.`
    };
    await kafkaProducer.send({
      topic: 'notif_admin_topic',
      messages: [{ value: JSON.stringify(queueMessage) }]
    });

    res.status(200).json({
      message: 'Tiket berhasil di-scan dan digunakan',
      status: 'success',
      ticket: result.ticket
    });

  } catch (err) {
    console.error('❌ Error saat scan tiket:', err);
    res.status(500).json({ error: 'Server error' });
  }
};