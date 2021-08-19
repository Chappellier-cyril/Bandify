const express = require('express')
const memberController = require('../controllers/memberController');
const instrumentController = require('../controllers/instrumentController');
const levelController = require('../controllers/levelController');
const musicStyleController = require('../controllers/musicStyleController');
const associationController = require('../controllers/associationController');

const router = express.Router();

// LOGIN Route
router.route('/login')
    .post(memberController.loginMember)

// SIGNUP Route
router.route('/signup')
    .post(memberController.createMember);

// MEMBERS Routes
router.route('/members')
    .get(memberController.getAllMembers);
    
router.route('/members/:id')
    .get(memberController.getOneMember)
    .patch(memberController.updateOneMember)
    .delete(memberController.deleteOneMember);

// INSTRUMENTS Routes
router.route('/instruments')
    .get(instrumentController.getAllInstruments)

router.route('/instruments/:id')
    .get(instrumentController.getOneInstrument)

// LEVELS Routes
router.route('/levels')
    .get(levelController.getAllLevel)

router.route('/levels/:id')
    .get(levelController.getOneLevel)

// MUSIC_STYLES Routes
router.route('/musicstyles')
    .get(musicStyleController.getAllMusicStyles)

router.route('/musicstyles/:id')
    .get(musicStyleController.getOneMusicStyle)


// MEMBER HAS INSTRUMENT

router.route('/members/member_instrument')
    .post(associationController.MemberhasInstrument)

module.exports = router;