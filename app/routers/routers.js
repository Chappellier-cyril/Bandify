const express = require('express')
const memberController = require('../controllers/memberController');

const router = express.Router();

router.route('/signup')
    .post(memberController.create);

router.route('/members')
    .get(memberController.getAll);
    

router.route('/members/:id')
    .get(memberController.getOne)
    .patch(memberController.updateOne)
    .delete(memberController.deleteOne);

module.exports = router;