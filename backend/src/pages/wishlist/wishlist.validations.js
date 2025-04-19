const Joi = require('joi');

// Skema validasi untuk menambahkan event ke wishlist
const addToWishlistSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    event_id: Joi.number().integer().required()
});

module.exports = { addToWishlistSchema };