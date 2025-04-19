const db = require('../../config/database');
const { Wishlist, Event } = require('../../models');

// Menambahkan event ke wishlist
exports.addEventToWishlist = async (data) => {
    // Validasi apakah event sudah ada di wishlist
    const existingWishlistItem = await Wishlist.findOne({
        where: { user_id: data.user_id, event_id: data.event_id }
    });

    if (existingWishlistItem) {
        throw new Error('Event sudah ada di wishlist');
    }

    // Menambah event ke wishlist
    const newWishlistItem = await Wishlist.create(data);
    return newWishlistItem;
};

// Menampilkan daftar wishlist 
exports.getWishlistByUser = async (userId) => {
    return await Wishlist.findAll({
        where: { user_id: userId },
        include: {
            model: Event,
            as: 'event',
            attributes: ['event_name', 'slug', 'event_date', 'venue', 'category_id', 'thumbnail_url']
        }
    });
};
