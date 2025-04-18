const service = require('./promo_code.service');
const { promoCodeSchema, redeemPromoSchema } = require('./promo_code.validations');

// Create Promo Code
exports.createPromoCode = async (req, res) => {
    try {
        const { error, value } = promoCodeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const promo = await service.create(value);
        res.status(201).json(promo);
    } catch (err) {
        console.error('❌ Error saat createPromoCode:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Redeem Promo
exports.redeemPromo = async (req, res) => {
    try {
        // Validasi request body
        const { error, value } = redeemPromoSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        // Panggil service untuk redeem promo
        const order = await service.redeemPromo(value);

        res.status(200).json({
            message: 'Promo redeemed successfully',
            order: order,
        });
    } catch (err) {
        console.error('❌ Error saat redeemPromo:', err);
        res.status(400).json({ error: err.message });
    }
};