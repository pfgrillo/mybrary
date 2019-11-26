const express = require('express');
const router = express.Router();

const pool = require('../database');  //hace referencia a la conexión a la bd. Si bien se importa todo el archivo,
                                      // el archivo sólo está exportando la constante pool

router.get('/', (req, res) => {
    res.render('authors/index');
});

router.get('/new', (req, res) => {
    res.render('authors/new');
});

router.post('/new', (req, res) => {
    res.send('Create');
});

module.exports = router;