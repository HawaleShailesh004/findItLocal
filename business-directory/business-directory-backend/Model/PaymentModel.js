// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    booking_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    payment_date: {
        type: Date,
        default: Date.now,
    },
    payment_method: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', "Google Pay", "Apple Pay"],
        required: true,
    },
    transaction_id: {
        type: String,
        required: true,
        unique: true,
    },
    payment_status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Completed',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
