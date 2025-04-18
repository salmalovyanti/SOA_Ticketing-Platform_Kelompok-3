const Joi = require('joi');

const addToWishlistSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    event_id: Joi.number().integer().required()
});

module.exports = { addToWishlistSchema };