const service = require('./cart.service');
const { addToCartSchema, checkoutSchema } = require('./cart.validations');

// Handler untuk menambah tiket ke keranjang
exports.addToCart = async (req, res) => {
    try {
        // Validasi data dari request body
        const { error, value } = addToCartSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Ambil user_id dari token JWT (req.user)
        const userId = req.user?.user_id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: user_id tidak tersedia dari token' });
        }

        // Gabungkan user_id ke value
        const payload = { ...value, user_id: userId };

        // Tambahkan tiket ke keranjang
        const newCartItem = await service.addToCart(payload);
        res.status(201).json({
            message: 'Tiket berhasil ditambahkan ke keranjang',
            data: newCartItem
        });
    } catch (err) {
        console.error('❌ Error saat addToCart:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Handler untuk melihat isi keranjang user
exports.getMyCart = async (req, res) => {
    try {
        // Ambil user_id dari auth atau query parameter
        const userId = req.user?.user_id || req.query.user_id;

        // Validasi user_id
        if (!userId) {
            return res.status(400).json({ error: 'User ID tidak ditemukan' });
        }

        // Ambil isi keranjang berdasarkan user_id
        const cartItems = await service.getCartByUser(userId);
        res.status(200).json({
            message: 'Isi keranjang berhasil diambil',
            data: cartItems
        });
    } catch (err) {
        console.error('❌ Error saat getMyCart:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Handler untuk checkout isi keranjang user
exports.checkout = async (req, res) => {
    try {
        // Validasi request body
        const { error, value } = checkoutSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const userId = req.user?.user_id || req.query.user_id; // Ambil user_id dari auth atau query param
        if (!userId) {
            return res.status(400).json({ error: 'User ID tidak ditemukan' });
        }

        // Proses checkout
        const order = await service.checkout(userId, value);
        res.status(201).json({
            message: 'Checkout berhasil!',
            data: order
        });
    } catch (err) {
        console.error('❌ Error saat checkout:', err);
        res.status(500).json({ error: 'Server error' });
    }
};