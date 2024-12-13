const express = require('express');
const router = express.Router();
const Booking = require('../Model/BookingModel'); // Adjust the path as necessary

// Create a New Booking
router.post('/new', async (req, res) => {
    const {
        user_id,
        business_id,
        service_id,
        booking_date,
        scheduled_date,
        status,
        notes,
        total_amount,
        payment_status,
        discount_code,
    } = req.body;

    const booking = new Booking({
        user_id,
        business_id,
        service_id,
        booking_date,
        scheduled_date,
        status,
        notes,
        total_amount,
        payment_status,
        discount_code,
    })
    try {
        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get All Bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user_id service_id business_id');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Bookings by User
router.get('/user/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ user_id: req.params.userId }).populate('service_id business_id');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Bookings by Business
router.get('/business/:businessId', async (req, res) => {
    try {
        const bookings = await Booking.find({ business_id: req.params.businessId }).populate('user_id service_id');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Booking Details
router.get('/details/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('user_id service_id business_id');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Bookings with populated business and service details
router.get('/userBookings/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ user_id: req.params.userId })
            .populate('business_id', 'business_name') // Only populating business_name
            .populate('service_id', 'service_name price') // Only populating service_name and price
            .select('scheduled_date total_amount payment_status status booking_date'); // Selecting relevant fields
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Booking Status
router.put('/:id', async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status, payment_status: req.body.payment_status }, { new: true });
        if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// Cancel a Booking
router.delete('/:id', async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Booking Statistics
router.get('/statistics', async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const completedBookings = await Booking.countDocuments({ status: 'completed' });
        const canceledBookings = await Booking.countDocuments({ status: 'canceled' });
        res.status(200).json({ totalBookings, completedBookings, canceledBookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;

