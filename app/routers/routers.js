// Importation des modules express et autres utilitaires
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

// Importation de tout les controllers 

const memberController = require('../controllers/memberController');
const instrumentController = require('../controllers/instrumentController');
const levelController = require('../controllers/levelController');
const musicStyleController = require('../controllers/musicStyleController');
const associationController = require('../controllers/associationController');
const searchController = require('../controllers/searchController');
const messageController = require('../controllers/messageController');
const invitationController = require('../controllers/invitationController');
const localisationController = require('../controllers/localisationController');
const authController = require('../controllers/authController');
const soundController = require('../controllers/soundController');
const schema = require('../validations/schema');

// Route de recherche d' un membre

router.route('/search')
    .get(searchController.getFilteredMembers);

// Route pour l' inscription d' un membre

router.route('/signup')
    .post(upload.single('file'), memberController.createMember);
    
// Route de login

router.route('/login')
    .post(memberController.loginMember);

// Route de token de vérification

router.post('/checkToken', memberController.verifyJWT);

// Route de vérification de mot de passe

router.route('/checkpassword/:id')
    .post(authController.checkPassword)

// Routes des membres

router.route('/members')
    .get(/* memberController.verifyJWT, */ memberController.getAllMembers);

// On vérifie avec le verifyJWT qu'on ai bien le token avant de passer
// au getAllMembers (Si je recupère tous les membres c'est que j'ai le bon token)

router.route('/members/:id')
    .get(memberController.getOneMember)
    .patch(upload.single('file'), memberController.updateOneMember)
    .delete(memberController.deleteOneMember);

// Routes des instruments

router.route('/instruments')
    .get(instrumentController.getAllInstruments);

router.route('/instruments/:id')
    .get(instrumentController.getOneInstrument);

// Routes des niveau pour les instruments
router.route('/levels')
    .get(levelController.getAllLevel);

router.route('/levels/:id')
    .get(levelController.getOneLevel);

// Routes des styles de musiques

 router.route('/musicstyles')
    .get(musicStyleController.getAllMusicStyles);

router.route('/musicstyles/:id')
    .get(musicStyleController.getOneMusicStyle);

// Routes des messages envoyés et recus des membres

router.route('/members/:id/messages')
    .get(messageController.getAllMessages)
    .post(messageController.sendMessage);   

router.route('/messages/:id')
     .get(messageController.readMessage);

router.route('/messages/:id/status')
    .patch(messageController.updateMessageStatus);

// Routes des invitations

router.route('/invitations')
    .post(invitationController.sendInvitation);

router.route('/invitations/:id')
    .delete(invitationController.deleteInvitation)
    .patch(invitationController.updateInvitation);

router.route('/members/:id/invitations')
    .get(invitationController.getAllInvitations)

// Routes des relations amicales

router.route('/members/:id/friends')
    .get(invitationController.getAllFriends)

router.route('/members/:id/pending_invitations')
    .get(invitationController.getPendingInvitations)
    
router.route('/members/:id/accepted_invitations')
    .get(invitationController.getAcceptedInvitations) 

// Routes des villes

router.get('/cities', localisationController.getAllCities);
router.get('/autocomplete/:search', localisationController.autocompleteCities);
router.get('/city/:id', localisationController.getOneCity);

// Routes des départements

router.get('/departments', localisationController.getAllDepartments);
router.get('/department/:id', localisationController.getOneDepartment);

// Routes des régions

router.get('/regions', localisationController.getAllRegions);
router.get('/region/:id', localisationController.getOneRegion);

// Routes de relations MEMBER HAS INSTRUMENT

router.route('/members/:id/add_instrument')
    .get(associationController.getMemberInstruments)
    .patch(associationController.updateMemberInstruments)
    .delete(associationController.deleteMemberInstruments)

// Routes de relations MEMBER HAS MUSIC_STYLES

router.route('/members/:id/add_musicstyle')
    .get(associationController.getMemberMusicStyles)
    .patch(associationController.updateMemberMusicStyles)
    .delete(associationController.deleteMemberMusicStyles);

// Route qui permet de stream les fichiers d'images des membres

router.get('/avatar/:key', memberController.streamMemberAvatar);

// Route qui permet de stream les fichiers sons des membres

router.get('/sound/:key', soundController.streamSound);

// Route pour créer /update / delete les sons d'un membre

router.route('/members/:id/sound')
    .post(upload.single('file'), soundController.createSound)
    .patch(soundController.patchSoundName)
    .delete(soundController.deleteSound);


module.exports = router;


// SWAGGER API DOCS sur : http://localhost:3000/api-docs

 /**
 * Permet de créer un utilisateur
 * @route POST /signup
 * @group Signup
 * @param {string} firstname.query.required - prénom du membre
 * @param {string} lastname.query.required - nom de famille du membre
 * @param {enum} birthdate.query.required - date de naissance du membre
 * @param {string} email.query.required - email du membre
 * @param {string} password.query.required - mot de passe du membre
 * @param {string} user_description.query - description du membre
 * @param {string} profil_image.query - image de profil du membre
 * @param {string} instruments.query.required - instruments du membre
 * @param {string} level.query.required - niveau de l' instrument
 * @param {string} musicstyles.query.required - styles de musique du membre
 * @operationId retrieveFooInfo
 * @returns {objet} 200 - Tableau des informations du membre
 */

 /**
 * Route de recherche d' un membre
 * @route Post /login
 * @group Login
 * @returns {object} 200
 */


/**
 * Route de recherche d' un membre
 * @route GET /search
 * @group Search
 * @returns {object} 200
 */

// MEMBRES

/**
 * Récuperer la liste de tout les membres avec leurs associations
 * @route GET /members
 * @group Members
 * @returns {object} 200 - Tableau de tout les membres récupéré
 */

/**
 * Récuperer un membre par l' id
 * @route GET /members/2
 * @route patch /members/2
 * @group Members
 * @returns {object} 200 - Tableau d' un membre récuperé
 */

/**
 * Supprimer un membre avec toutes ses asssociations selon son id
 * @route DELETE /members/2
 * @group Members
 * @returns {object} 200
 */

// INSTRUMENTS

/**
 * Récuperer toute la liste des instruments
 * @route GET /instruments
 * @group Instruments
 * @returns {object} 200 - Tableau de tout les instruments
 */

/**
 * Récuperer un instrument par l' id
 * @route GET /instruments/1
 * @group Instruments
 * @returns {object} 200 - Tableau d' un instrument récupéré
 */  

// NIVEAU D' INSTRUMENT
/**
 * Récuperer la liste des levels
 * @route GET /levels
 * @group Levels
 * @returns {object} 200 - Tableau de tout les levels
 */

/**
 * Récuperer un level par l' id
 * @route GET /levels/2
 * @group Levels
 * @returns {object} 200 - Tableau d' un level récupéré
 */   

// STYLES DE MUSIQUES
/**
 * Récuperer la liste des styles de musiques
 * @route GET /musicstyles
 * @group Music Styles
 * @returns {object} 200 - Tableau de tout les styles de musiques
 */        

/**
 * Récuperer un style de musique par son id
 * @route GET /musicstyles/3
 * @group Music Styles
 * @returns {object} 200 - Tableau d' un style de musique récupéré
 */  

// VILLES
/**
 * Récuperer la liste de toutes les villes
 * @route GET /cities
 * @group Cities
 * @returns {object} 200 - Tableau de toutes les villes

/**
 * Récuperer la liste d' une ville selon son code
 * @route GET /city/01034
 * @group Cities
 * @returns {object} 200 - Tableau d' une ville récupéré
 */


// DEPARTEMENTS
/**
 * Récuperer la liste de tout les départements
 * @route GET /departments
 * @group Departements
 * @returns {object} 200 - Tableau de tout les départements
 */

/**
 * Récuperer la liste d'un département selon son code
 * @route GET /department/93
 * @group Departements
 * @returns {object} 200 - Tableau d'un département récupéré
 */


//REGIONS
/**
 * Récuperer la liste de toutes les régions
 * @route GET /regions
 * @group Regions
 * @returns {object} 200 - Tableau de toutes les régions
 */   

/**
 * Récuperer la liste d' une région selon son code
 * @route GET /region/44
 * @group Regions
 * @returns {object} 200 - Tableau d' une région récupéré
 */ 


// FRIENDS
/**
 * Récupere toutes les amis d' un membre selon son id avec tout ses associations
 * @route GET /members/2/friends
 * @group Friends
 * @returns {object} 200 - Tableau des amis d' un membre
 */  


// INVITATIONS
/**
 * Récupere toutes les invitations en attente de réponse pour un membre
 * @route GET /members/2/invitations
 * @group Invitations
 * @returns {object} 200 - Tableau de des invitations en attente
 */  

/**
 * Supprimer une invitation selon son id
 * @route DELETE /invitation/2
 * @group Invitations
 * @returns {object} 200
 */

/**
 * Accepter une invitation selon son id
 * @route PATCH /invitation/2
 * @group Invitations
 * @returns {object} 200
 */

// SOUND
/**
 * Ajouter un son pour un membre
 * @route POST /members/2/sound
 * @group SOUND
 * @returns {object} 200
 */

/**
 * Mettre a jour un son pour un membre
 * @route PATCH /members/2/sound
 * @group SOUND
 * @returns {object} 200
 */

/**
 * Supprimer un son pour un membre
 * @route DELETE /members/2/sound
 * @group SOUND
 * @returns {object} 200
 */

// MESSAGES

/**
 * Récuperer la liste des messages d' un membre connecté selon son id
 * @route GET /members/2/messages
 * @group Message
 * @returns {object} 200 - Tableau de tout les messages d' un membre
 */   

/**
 * Envoyer un message
 * @route POST /messages
 * @group Message
 * @returns {object} 200 - Tableau du message envoyé
 */   

/**
 * Récupere un message 
 * @route GET /messages/3
 * @group Message
 * @returns {object} 200 - Tableau du message recu
 */   


 


