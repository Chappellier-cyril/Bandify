const express = require('express')
const memberController = require('../controllers/memberController');

const router = express.Router();

router.route('/members')
    .get(memberController.getAll);

module.exports = router;