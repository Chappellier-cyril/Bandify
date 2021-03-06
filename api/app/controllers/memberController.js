const { Member, Play } = require('../models');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
// const memberSchema = require('../validations/schema')

const { uploadFile, getFileStream } = require('../../s3');
/* Mise en place de Multer qui nous permets de récupérer un multipart form-data depuis le front
    Il nous met à disposition une fonction pour choisir le storage et une fonction upload 
    que l'on appelera dans notre controller, à l'intérieur on aura accés au req.body et req.file
*/

const memberController = {

    // Récuperer la liste de tout les membres
    getAllMembers: async (req, res, next) => {
        try {
            const members = await Member.findAll();

            res.json(members);
            
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

    // Récuperer un membre selon son Id

    getOneMember: async (req, res, next) => {
        try {
            const targetId = req.params.id;

            const member = await Member.findByPk(targetId);

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

    // Créer un membre a l' inscription

    createMember: async (req, res) => {
        try {
            const file = req.file;
            let result;
            if(file) result = await uploadFile(file);

            // req.body contient les informations nécessaires pour créer 
            // un nouveau membre
            
             // On lui hash le password => le 3ième argument de la fonction hash est un cazllback, qui nous donne accés à l'erreur si erreur ou au mdp hashé
            passwordHashed = bcrypt.hash(req.body.user_password, 10, async (err, hash) =>{
                if(err) return err;
                const foundMember = await Member.findOne({
                    where : {
                        email : req.body.email,
                    }
                });
                if (foundMember) {
                    return res.json({
                        error: 'Un utilisateur à déjà utiliser cette adresse email pour s\'inscirire'
                    });
                }
                 // Les array passés dans le req.body via le formulaire doivent être décodé pour y avoir accés;
                const instruments = JSON.parse(req.body.instruments);
                const styles = JSON.parse(req.body.styles);
                 // On créé un membre avec les infos récup du body et le mdp hashé
                const member = await Member.create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    birthdate: req.body.birthdate,
                    user_description: req.body.user_description,
                    user_password: hash,
                    city_code: req.body.city_code,
                    profil_image: file ? `${result.key}`: null,
                    })
            
                 // Si le membre à séléctionné des styles, on boucle dessus pour associer chaque style au member
                if(styles) {
                    styles.map(async (style)=> await member.addStyle(Number(style))) 
                }

                // const result = await memberSchema.validateAsync(req.body);

                 // On boucle sur chaque objet instruments pour créer l'association
                instruments.map(async (play) => play.instrument && await Play.create({
                  instrument_id: play.instrument,
                  member_id: member.id,
                  level_id: play.level
                }));
                const newMember = await Member.findByPk(member.id);
                // Envoi de la réponse au front si tout est ok
                res.json({
                    success : 'New Member added', member: newMember
                });
            })
        }catch(error) {
            console.trace(error);
            res.status(500).json({
                error: `Une erreur est survenue ${error.message}`
            });
        }
    },

    // Mettre a jour les infos d' un membre

    updateOneMember: async (req, res, next) => {
        try {
            // On utilise l'id de la cible, dans les params d'url

            const targetId = req.params.id;
            // on passe par une instance
            const memberToUpdate = await Member.findByPk(targetId);
            if (!memberToUpdate) {

                return next(); // <= pas de liste, 404
            }
            if(req.body.user_password) {
                // Lors d'un update (modification de mot de passe par exemple)
                // On hash à nouveau le mot de passe
             const passwordHashed = await bcrypt.hash(req.body.user_password, 10);
             req.body.user_password = passwordHashed;
            }
            if(req.body.styles) {
               return req.body.styles.map(async (style)=> await memberToUpdate.addStyle(Number(style))) 
            }
            // On boucle sur chaque objet instruments pour créer l'association
            if(req.body.instrument) {
                req.body.instruments.map(async (play) => play.instrument && await Play.findOrCreate({
                    instrument_id: play.instrument,
                    member_id: memberToUpdate.id,
                    level_id: play.level
                  }));
                return res.json(memberToUpdate);
            }

            const file = req.file;
            let result;
            if(file) {
                result = await uploadFile(file);
                req.body.profil_image = result.key;
            } 
            // Et les nouvelles valeurs des props, dans le body
                await memberToUpdate.update(req.body);

                const member = await Member.findByPk(targetId)

                return res.json(member);
            
        } catch (error) {
            console.trace(error);
            res.status(500).json({error: `Une erreur est survenue ${error.message}`}); 
        }
    },

    // Supprimer un membre

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

    // Se connecter pour un membre

    loginMember : async (req, res) => {
        try {
            
          // On vérifie qu'un membre correspond au mail entré par l'utilisateur
          const member = await Member.findOne({
              where: {
                  email: req.body.email
              },
              attributes: {
                include: ['user_password'],
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
    },
    // Middleware qui permet d'accéder au fichier statique d'avatar des membres
    streamMemberAvatar: (req, res) => {
        try{
            const key = req.params.key;
            const readStream = getFileStream(key);
            return readStream.pipe(res);

        }catch(err) {
            console.trace(err);
            res.status(401).send(err);
        }

    },
    // "Middleware" qui vérifie si notre token est bon
    verifyJWT: (req, res, next) => {
        const token = req.headers["x-acces-token"] || req.body.headers["x-acces-token"];
        
        const url =  req.route.path;
        if(!token) {
            res.status(401).send("Token needed");
        } else {
            jsonwebtoken.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.json({
                        auth: false,
                        message: "Failed to authenticate"
                    });
                } else {
                    req.userId = decoded.id;
                    if (url === '/checkToken') {
                        return res.json({
                            auth: true,
                            message: "Authentification Success"
                        });
                    }
                    next();
                }
            });
        }
    }
        
    
};

module.exports = memberController;