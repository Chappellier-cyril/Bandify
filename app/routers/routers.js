const express = require('express');
const memberController = require('../controllers/memberController');
const instrumentController = require('../controllers/instrumentController');
const levelController = require('../controllers/levelController');
const musicStyleController = require('../controllers/musicStyleController');
const associationController = require('../controllers/associationController');
const searchController = require('../controllers/searchController');
const messageController = require('../controllers/messageController');
const invitationController = require('../controllers/invitationController');

const localisationController = require('../controllers/localisationController');
const router = express.Router();

// SEARCH Route
router.route('/search')
    .get(searchController.getFilteredMembers);

// SIGNUP Route
router.route('/signup')
    .post(memberController.createMember);

// LOGIN Route
router.route('/login')
    .post(memberController.loginMember);

// MEMBERS Routes

/**
 * Récuperer tout les membres
 * @route GET /members
 * @returns {object} 200 - An array of user info
 */

router.route('/members')
    .get(memberController.getAllMembers);

/**
 * Récuperer un membre par l' id
 * @route GET /members/1
 * @returns {object} 200 - An array of user info
 */

router.route('/members/:id')
    .get(memberController.getOneMember)
    .patch(memberController.updateOneMember)
    .delete(memberController.deleteOneMember);


/**
 * Récuperer toute la liste des instruments
 * @route GET /instruments
 * @returns {object} 200 - An array of user info
 */

router.route('/instruments')
    .get(instrumentController.getAllInstruments);

/**
 * Récuperer un instrument par l' id
 * @route GET /instruments/:id
 * @returns {object} 200 - An array of user info
 */    
router.route('/instruments/:id')
    .get(instrumentController.getOneInstrument);

/**
 * Récuperer la liste des levels
 * @route GET /levels
 * @returns {object} 200 - An array of user info
 */

router.route('/levels')
    .get(levelController.getAllLevel);

/**
 * Récuperer un level par l' id
 * @route GET /levels/:id
 * @returns {object} 200 - An array of user info
 */    

router.route('/levels/:id')
    .get(levelController.getOneLevel);

/**
 * Récuperer la liste des styles de musiques
 * @route GET /musicstyles
 * @returns {object} 200 - An array of user info
 */        

router.route('/musicstyles')
    .get(musicStyleController.getAllMusicStyles);
    
/**
 * Récuperer un style de musique par son id
 * @route GET /musicstyles/:id
 * @returns {object} 200 - An array of user info
 */   

router.route('/musicstyles/:id')
    .get(musicStyleController.getOneMusicStyle);

/**
 * Récuperer la liste de toutes les villes
 * @route GET /cities
 * @returns {object} 200 - An array of user info
 */   

router.route('/messages')
    .get(messageController.getAllMessages)
    .post(messageController.createMessage)

router.route('/messages/:id')
    .post(messageController.createMessage);

router.route('/invitations')
    .get(invitationController.getAllInvitations);

router.route('/invitations/:id')
    .post(invitationController.sendInvitation)
    .post(invitationController.deleteInvitation)
    .patch(invitationController.acceptInvitation);

// ROUTE DE LOCALISATION
router.get('/cities', localisationController.getAllCities);
router.get('/cities/:id', localisationController.getOneCity);
router.get('/departments', localisationController.getAllDepartments);
router.get('/departments/:id', localisationController.getOneDepartment);

router.get('/regions', localisationController.getAllRegions);
router.get('/regions/:id', localisationController.getOneRegion);
// MEMBER HAS INSTRUMENT

router.route('/members/member_instrument')
    .post(associationController.MemberhasInstrument);

// MEMBER HAS MUSIC_STYLES

router.route('/members/member_musicstyle')
    .post(associationController.MemberhasMusicStyle);


module.exports = router;