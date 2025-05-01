const express = require('express');
const jwt = require('jsonwebtoken');
const Password = require('../models/Password');
const router = express.Router();

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "No token, auth denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

router.post('/save', authMiddleware, async (req, res) => {
    const { type, account, password } = req.body;
    try {
        const newEntry = new Password({
            userId: req.user.id,
            type,
            account,
            password // You can encrypt this before saving if needed
        });
        await newEntry.save();
        res.json({ msg: "Password saved" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/get', authMiddleware, async (req, res) => {
    try {
        const data = await Password.find({ userId: req.user.id });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
