const db = require('../../config/database'); 
const { Ticket, Event, Category, User } = require('../../models');
const IssuedTicket = require('../../models/issuedticket');

// Membuat tiket baru
exports.create = async (data) => {
  return await Ticket.create(data);
};

// Mengambil semua tiket
exports.getAll = async () => {
  return await Ticket.findAll({
    include: {
      model: Event,
      as: 'event',
      attributes: ['event_name'] // Menampilkan nama event terkait
    }
  });
};

// Mengambil tiket berdasarkan ID
exports.getById = async (id) => {
  return await Ticket.findByPk(id, {
    include: {
      model: Event,
      as: 'event',
      attributes: ['event_name'] // Menampilkan nama event terkait
    }
  });
};

// Memperbarui tiket berdasarkan ID
exports.update = async (id, data) => {
  const ticket = await Ticket.findByPk(id);
  if (!ticket) return null;
  return await ticket.update(data); // Mengupdate data tiket
};

// Menghapus tiket berdasarkan ID
exports.delete = async (id) => {
  const ticket = await Ticket.findByPk(id);
  if (!ticket) return null;
  await ticket.destroy(); // Menghapus tiket dari database
  return ticket;
};

// Mengambil tiket berdasarkan ID event
exports.getByEventId = async (eventId) => {
  return await Ticket.findAll({
    where: { event_id: eventId }, // Mencari tiket berdasarkan ID event
    include: [
      {
        model: Event,
        as: 'event',
        include: [{
            model: Category,
            as: 'category', // Kategori event (relasi dengan Event)
            attributes: ['category_name'] // Menampilkan nama kategori
          }],
        attributes: ['event_name'] // Menampilkan nama event terkait
      }
    ]
  });
};

// Proses pembelian tiket
exports.purchase = async (data) => {
  const { user_id, event_id, ticket_id } = data;

  // Cek apakah user ada
  const user = await User.findByPk(user_id);
  if (!user) {
    throw new Error('User tidak ditemukan');
  }

  // Cek apakah event ada
  const event = await Event.findByPk(event_id);
  if (!event) {
    throw new Error('Event tidak ditemukan');
  }

  // Cek apakah tiket ada
  const ticket = await Ticket.findByPk(ticket_id);
  if (!ticket) {
    throw new Error('Tiket tidak tersedia');
  }

  // Pembelian tiket berhasil
  const purchasedTicket = await Ticket.create({
    user_id,
    event_id,
    ticket_id,
    status: 'purchased', // Menandakan bahwa tiket telah dibeli
    purchase_date: new Date(), // Tanggal pembelian tiket
  });

  return purchasedTicket;
};

// Proses pembelian tiket dengan pengecekan stok
exports.purchase = async (data) => {
  const { user_id, event_id, ticket_id } = data;

  // Cek apakah user ada
  const user = await User.findByPk(user_id);
  if (!user) throw new Error('User tidak ditemukan');

  // Cek apakah event ada
  const event = await Event.findByPk(event_id);
  if (!event) throw new Error('Event tidak ditemukan');

  // Cek apakah tiket ada
  const ticket = await Ticket.findByPk(ticket_id);
  if (!ticket) throw new Error('Tiket tidak ditemukan');

  // Cek apakah stok tiket masih ada
  if (ticket.stock <= 0) {
    throw new Error('Tiket habis');
  }

  // Kurangi stok dan tambah jumlah tiket terjual
  ticket.stock -= 1;
  ticket.sold += 1;
  await ticket.save();

  return {
    message: 'Tiket berhasil dibeli',
    ticket_id: ticket.ticket_id, // ID tiket yang dibeli
    remaining_stock: ticket.stock // Sisa stok tiket yang tersedia
  };
};

// Proses scan barcode
exports.processScan = async (ticket_code) => {
  const ticket = await IssuedTicket.findOne({ where: { ticket_code } });

  if (!ticket) return { status: 'not_found' };
  if (ticket.is_used) return { status: 'used' };

  ticket.is_used = true;
  ticket.used_at = new Date();
  await ticket.save();

  return { status: 'success', ticket };
};