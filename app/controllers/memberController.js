const { Member, Play, Instrument, Level, MusicStyle } = require('../models');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const multer = require('multer');
/* Mise en place de Multer qui nous permets de récupérer un multipart form-data depuis le front
    Il nous met à disposition une fonction pour choisir le storage et une fonction upload 
    que l'on appelera dans notre controller, à l'intérieur on aura accés au req.body et req.file
*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname )
    }

});
const upload = multer({ storage: storage }).single('file');

const memberController = {
    // Get all members
    getAllMembers: async (req, res, next) => {
        try {
            const members = await Member.findAll({
                include: [{
                    association: 'city',
                    include: {
                        association: 'department',
                        include: 'region',
                    },
                },{
                    association: 'plays',
                    include: ['instrument', 'level']
            }, 'styles']});

            res.json(members);
            
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Get one member
    getOneMember: async (req, res, next) => {
        try {
            const targetId = req.params.id;

            const member = await Member.findByPk(targetId, {
                include: [{
                    association: 'city',
                    include: {
                        association: 'department',
                        include: 'region',
                    },
                }, {
                    association: 'plays',
                    include: ['instrument', 'level']
            }, 'styles']
            });

            // Soit le membre existe : Soit il n'existe pas
            if (member) {
                res.json(member);
            } else {
                next(); // => 404
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Create a member
    createMember: async (req, res, next) => {
        try {
            // req.body contient les informations nécessaires pour créer 
            // un nouveau membre
            // Tout se passe à l'intérieur de la méthode upload de Multer
            upload(req, res, function (err) {
            // Je commence par le traitement d'erreur de Multer, et/ou général
            if (err instanceof multer.MulterError) {
                // erreur de l'instance multer
                return res.status(500).json(err)
            } else if (err) {
                //erreur génréale
                return res.status(500).json(err)
            }
            // On lui hash le password => le 3ième argument de la fonction hash est un cazllback, qui nous donne accés à l'erreur si erreur ou au mdp hashé
            passwordHashed = bcrypt.hash(req.body.user_password, 10, async (err, hash) =>{
                if(err) return err;
                // Les array passés dans le req.body via le formulaire doivent être décodé pour y avoir accés;
                const instruments = JSON.parse(req.body.instruments);
                const styles = JSON.parse(req.body.styles);
                // On créé un membre avec les infos récup du body et le mdp hashé
                const member = await Member.create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    birthdate: req.body.birthdate,
                    user_password: hash,
                    city_code: req.body.city_code,
                    profil_image: req.file ? `${req.file.filename}`: null,
                    })
                // Si le membre à séléctionné des styles, on boucle dessus pour associer chaque style au member
                if(styles) {
                    styles.map(async (style)=> await member.addStyle(Number(style))) 
                }
                // On boucle sur chaque objet instruments pour créer l'association
                instruments.map(async (play) => play.instrument && await Play.create({
                  instrument_id: play.instrument,
                  member_id: member.id,
                  level_id: play.level
                }));
                // JWT Config
                const jwtSecret = process.env.TOKEN_SECRET;
                const jwtContent = { memberId: member.id };
                const jwtOptions = { 
                algorithm: 'HS256', 
                expiresIn: '3h' 
                };
                // Envoi de la réponse au front si tout est ok
                res.json({
                id: member.id,
                email: member.email,
                token: jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions),
                });
            }) 
            })
        }catch(error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    updateOneMember: async (req, res, next) => {
        try {
            // On utilise l'id de la cible, dans les params d'url
            const targetId = req.params.id;
            // on passe par une instance
            const memberToUpdate = await Member.findByPk(targetId);
            if(req.body.user_password) {
                // Lors d'un update (modification de mot de passe par exemple)
                // On hash à nouveau le mot de passe
             const passwordHashed = await bcrypt.hash(req.body.user_password, 10);
             req.body.user_password = passwordHashed;
             
            }
            if (!memberToUpdate) {
                return next(); // <= pas de liste, 404
            }
            // Et les nouvelles valeurs des props, dans le body
            await memberToUpdate.update(req.body);
            // l'objet est à jour, on le renvoie
            res.json(memberToUpdate);
            
        } catch (error) {
            console.trace(error);
            res.status(500).json(error); 
        }
    },

    deleteOneMember: async (req, res, next) => {
        try {
            const targetId = req.params.id;

            const nbDeletedMember = await Member.destroy({
                where: {
                    id: targetId
                }
            });

            // Si y'a au moins 1 membre de supprimer alors :
            if (nbDeletedMember > 0) {
                res.json({message: "ok, membre supprimé"});
            } else {
                next(); // On envoie une 404
            }

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    loginMember : async (req, res) => {

        try {
            
          // On vérifie qu'un membre correspond au mail entré par l'utilisateur
          const member = await Member.findOne({
              where: {
                  email: req.body.email
              }
          });

          // Si on trouve pas on passe dans le catch
          if(!member) {
            throw({error : 'Identifiants incorrects'});
          }
      
          // On compare avec bcrypt les mot de passes
          const passwordToCompare=member.user_password;
  
          const isPasswordValid = await bcrypt.compare(req.body.user_password, passwordToCompare);
  
          // Si le mot de passe n'est pas valide on passe dans le catch
          if(!isPasswordValid) {
            throw({error : 'Identifiants incorrects'});
          }
  
          // JWT Config
          const jwtSecret = process.env.TOKEN_SECRET;
          const jwtContent = { memberId: member.id };
          const jwtOptions = { 
          algorithm: 'HS256', 
          expiresIn: '3h' 
        };
          // Envoi de la réponse au front si tout est ok
          
          res.json({
          id: member.id,
          email: member.email,
          token: jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions),
          });
  
        } catch(err) {
          // Envoi de l'erreur au front s'il y en a une
          console.trace(err);
            res.status(401).send(err);
        }
      
            
        }

       
        
    
};

module.exports = memberController;