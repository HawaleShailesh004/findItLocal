
const express = require("express");
const router = express.Router();

const Availability = require("../Model/AvailabilityModel");

router.post('/create', async (req, res, next) => {
    try {
        const newAvailability = new Availability(req.body);
        await newAvailability.save();
        res.status(201).json(newAvailability);
    } catch (err) {
        next(err);
    }
});

router.get('/service/:serviceId', async (req, res, next) => {
    try {
        const availability = await Availability.find({ service_id: req.params.serviceId });
        if (!availability.length) {
            return res.status(404).json({ message: 'No availability found for this service' });
        }
        res.status(200).json(availability);
    } catch (err) {
        next(err);
    }
});

router.put('/update/:id', async (req, res, next) => {
    try {
        const updatedAvailability = await Availability.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedAvailability) {
            return res.status(404).json({ message: 'Availability not found' });
        }
        res.status(200).json(updatedAvailability);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedAvailability = await Availability.findByIdAndDelete(req.params.id);
        if (!deletedAvailability) {
            return res.status(404).json({ message: 'Availability not found' });
        }
        res.status(200).json({ message: 'Availability deleted successfully' });
    } catch (err) {
        next(err);
    }
});

router.get('/date/:date', async (req, res, next) => {
    try {
        const date = new Date(req.params.date);
        const availability = await Availability.find({ available_date: date });
        if (!availability.length) {
            return res.status(404).json({ message: 'No availability found for this date' });
        }
        res.status(200).json(availability);
    } catch (err) {
        next(err);
    }
});

module.exports = router;