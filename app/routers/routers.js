const express = require('express')
const memberController = require('../controllers/memberController');

const router = express.Router();

router.route('/members')
    .get(memberController.getAll)
    .post(memberController.create);

router.route('/members/:id')
    .get(memberController.getOne);

module.exports = router;