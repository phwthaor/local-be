const express = require("express");
const router = express.Router();


router.get('/', async (req, res) => {

    try {
        console.log("OK");
        res.status(200).send("OK");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;