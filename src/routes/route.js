const express = require('express');
const router = express.Router();

//----------dummy-------------
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


module.exports = router