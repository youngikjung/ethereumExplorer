"use strict";

const express   = require('express')
const router    = express.Router();
const logger    = require('../utils/logger');

router.get('/', (req, res) => {
    logger.info('진입');
    res.render('ethereum/index');
});

router.get('/back', (req, res) => {
    logger.info('back');
    res.redirect('/ethereum');
});