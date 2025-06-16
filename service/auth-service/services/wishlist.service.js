const db = require('../config/database');
// const { Wishlist, Event } = require('../models'); // sementara dikomen

// Menambahkan event ke wishlist
exports.addEventToWishlist = async (data) => {
    // const existingWishlistItem = await Wishlist.findOne({
    //     where: { user_id: data.user_id, event_id: data.event_id }
    // });
    const existingWishlistItem = null; // sementara anggap belum ada

    if (existingWishlistItem) {
        throw new Error('Event sudah ada di wishlist');
    }

    // const newWishlistItem = await Wishlist.create(data);
    // return newWishlistItem;

    return {
        message: 'Simulasi tambah wishlist sukses (model belum aktif)',
        data
    };
};

// Menampilkan daftar wishlist 
exports.getWishlistByUser = async (userId) => {
    // return await Wishlist.findAll({
    //     where: { user_id: userId },
    //     include: {
    //         model: Event,
    //         as: 'event',
    //         attributes: ['event_name', 'slug', 'event_date', 'venue', 'category_id', 'thumbnail_url']
    //     }
    // });

    return [
        {
            wishlist_id: 1,
            user_id: userId,
            event_id: 123,
            message: 'Simulasi wishlist (model belum aktif)'
        }
    ];
};
