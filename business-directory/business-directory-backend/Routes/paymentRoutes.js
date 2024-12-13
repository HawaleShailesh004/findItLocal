// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const Payment = require('../Model/PaymentModel');

// Create a new payment
router.post('/', async (req, res) => {
    const { booking_id, user_id, amount, payment_method, transaction_id } = req.body;

    try {
        const payment = new Payment({
            booking_id,
            user_id,
            amount,
            payment_method,
            transaction_id,
        });
        await payment.save();
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Retrieve a payment by ID
router.get('/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('booking_id user_id');
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.json(payment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update payment status
router.patch('/:id', async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.json(payment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a payment
router.delete('/:id', async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.json({ message: 'Payment deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
