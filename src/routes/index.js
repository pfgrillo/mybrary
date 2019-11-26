//este index es el homepage. No confundir con el index de configuración del servidor!!

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('layouts/main');
});



module.exports = router;