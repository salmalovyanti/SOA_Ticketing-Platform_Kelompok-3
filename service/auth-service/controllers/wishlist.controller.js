const service = require('../services/wishlist.service');
const { addToWishlistSchema } = require('../validations/wishlist.validations');

// Handler untuk menambahkan event ke wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { error, value } = addToWishlistSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const newWishlistItem = await service.addEventToWishlist(value);
        res.status(201).json({
            message: 'Event berhasil ditambahkan ke wishlist',
            data: newWishlistItem
        });
    } catch (err) {
        console.error('❌ Error saat addToWishlist:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Handler untuk menampilkan daftar wishlist 
exports.getMyWishlist = async (req, res) => {
    try {
        const userId = req.user?.id || req.query.user_id; // Ambil dari auth atau query param

        if (!userId) {
            return res.status(400).json({ error: 'User ID tidak ditemukan' });
        }

        const wishlistItems = await service.getWishlistByUser(userId);
        res.status(200).json({
            message: 'Daftar wishlist berhasil diambil',
            data: wishlistItems
        });
    } catch (err) {
        console.error('❌ Error saat getMyWishlist:', err);
        res.status(500).json({ error: 'Server error' });
    }
};
