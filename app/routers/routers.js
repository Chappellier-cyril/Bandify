// MODULES EXPRESS
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

//CONTROLLERS
const memberController = require('../controllers/memberController');
const instrumentController = require('../controllers/instrumentController');
const levelController = require('../controllers/levelController');
const musicStyleController = require('../controllers/musicStyleController');
const associationController = require('../controllers/associationController');
const searchController = require('../controllers/searchController');
const messageController = require('../controllers/messageController');
const invitationController = require('../controllers/invitationController');
const localisationController = require('../controllers/localisationController');
const errorController = require('../controllers/errorController');

// SEARCH Route
router.route('/search')
    .get(searchController.getFilteredMembers);

// SIGNUP Route
router.route('/signup')
    .post(upload.single('file'), memberController.createMember);
    
// LOGIN Route
router.route('/login')
    .post(memberController.loginMember);

// TOKEN Verify
router.post('/checkToken', memberController.verifyJWT);

// MEMBERS Routes

/**
 * Récuperer tout les membres
 * @route GET /members
 * @returns {object} 200 - Tableau de tout les membres récuperé
 */

router.route('/members')
    .get(/* memberController.verifyJWT, */ memberController.getAllMembers);
// On vérifie avec le verifyJWT qu'on ai bien le token avant de passer
// au getAllMembers (Si je recupère tous les membres c'est que j'ai le bon token)

/**
 * Récuperer un membre par l' id
 * @route GET /members/2
 * @route patch /members/2
 * @returns {object} 200 - Tableau d' un membre récuperé
 */

router.route('/members/:id')
    .get(memberController.getOneMember)
    .patch(upload.single('file'), memberController.updateOneMember)
    .delete(memberController.deleteOneMember);

/**
 * Récuperer toute la liste des instruments
 * @route GET /instruments
 * @returns {object} 200 - Tableau de tout les instruments
 */

router.route('/instruments')
    .get(instrumentController.getAllInstruments);

/**
 * Récuperer un instrument par l' id
 * @route GET /instruments/1
 * @returns {object} 200 - Tableau d' un instrument récupéré
 */    
router.route('/instruments/:id')
    .get(instrumentController.getOneInstrument);

/**
 * Récuperer la liste des levels
 * @route GET /levels
 * @returns {object} 200 - Tableau de tout les levels
 */

router.route('/levels')
    .get(levelController.getAllLevel);

/**
 * Récuperer un level par l' id
 * @route GET /levels/2
 * @returns {object} 200 - Tableau d' un level récupéré
 */    

router.route('/levels/:id')
    .get(levelController.getOneLevel);

/**
 * Récuperer la liste des styles de musiques
 * @route GET /musicstyles
 * @returns {object} 200 - Tableau de tout les styles de musiques
 */        

router.route('/musicstyles')
    .get(musicStyleController.getAllMusicStyles);
    
/**
 * Récuperer un style de musique par son id
 * @route GET /musicstyles/3
 * @returns {object} 200 - Tableau d' un style de musique récupéré
 */   

router.route('/musicstyles/:id')
    .get(musicStyleController.getOneMusicStyle);

/**
 * Récuperer la liste de tout les messages
 * @route GET /messages
 * @returns {object} 200 - Tableau de tout les messages
 */   

/**
 * Envoyer un message
 * @route POST /messages
 * @returns {object} 200 - Tableau du message envoyé
 */   

router.route('/members/:id/messages')
    .get(messageController.getAllMessages)
    .post(messageController.sendMessage);
   
/**
 * Récupere un message 
 * @route GET /messages/3
 * @returns {object} 200 - Tableau du message recu
 */   

router.route('/messages/:id')
     .get(messageController.readMessage);

router.route('/messages/:id/status')
    .patch(messageController.updateMessageStatus);

/**
 * Récupere toutes les invitations en attente de réponse pour un membre
 * @route GET /members/2/invitations
 * @returns {object} 200 - Tableau du message recu
 */  

router.route('/invitations')
    .post(invitationController.sendInvitation);

router.route('/members/:id/invitations')
    .get(invitationController.getAllInvitations)

router.route('/members/:id/friends')
    .get(invitationController.getAllFriends)

router.route('/members/:id/pending_invitations')
    .get(invitationController.getPendingInvitations)    

router.route('/invitations/:id')
    .delete(invitationController.deleteInvitation)
    .patch(invitationController.updateInvitation);

// ROUTE DE LOCALISATION

/**
 * Récuperer la liste de toutes les villes
 * @route GET /cities
 * @returns {object} 200 - Tableau de toutes les villes
 */
router.get('/cities', localisationController.getAllCities);
router.get('/autocomplete/:search', localisationController.autocompleteCities);

/**
 * Récuperer la liste de toutes les villes
 * @route GET /city/85
 * @returns {object} 200 - Tableau d' une ville récupéré
 */
router.get('/city/:id', localisationController.getOneCity);

/**
 * Récuperer la liste de tout les départements
 * @route GET /departments
 * @returns {object} 200 - Tableau de tout les départements
 */

router.get('/departments', localisationController.getAllDepartments);

/**
 * Récuperer la liste d'un département selon son Id
 * @route GET /department/85
 * @returns {object} 200 - Tableau d'un département récupéré
 */

router.get('/department/:id', localisationController.getOneDepartment);

/**
 * Récuperer la liste de toutes les régions
 * @route GET /regions
 * @returns {object} 200 - Tableau de toutes les régions
 */   

/**
 * Récuperer la liste d' une région selon son Id
 * @route GET /region/85
 * @returns {object} 200 - Tableau d' une région récupéré
 */ 

router.get('/regions', localisationController.getAllRegions);
router.get('/region/:id', localisationController.getOneRegion);

// MEMBER HAS INSTRUMENT

router.route('/members/:id/add_instrument')
    .get(associationController.getMemberInstruments)
    .patch(associationController.updateMemberInstruments)
    .delete(associationController.deleteMemberInstruments)

// MEMBER HAS MUSIC_STYLES

router.route('/members/:id/add_musicstyle')
    .get(associationController.getMemberMusicStyles)
    .patch(associationController.updateMemberMusicStyles)
    .delete(associationController.deleteMemberMusicStyles);

// Route qui permet de stream les fichiers d'images des membres
router.get('/avatar/:key', memberController.streamMemberAvatar);

router.route('/error')
    .get(errorController.notFound);

module.exports = router;