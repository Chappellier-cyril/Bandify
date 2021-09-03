const { Sound } = require('../models');
const { uploadFile, getFileStream } = require('../../s3');

const soundController = {
    createSound: async (req, res, next) => {
        try{
            const memberId = req.params.id;
            const file = req.file;
            console.log(file);
            let result;
            if(file) result = await uploadFile(file);
            if(result){
                const newSound = await Sound.create({
                    member_id: memberId,
                    key: result.key,
                    name: file.originalname
                });
                return res.json(newSound);
            }else{
                return res.status(500).json({
                    error: `Une erreur est survenue`
                });
            }
        }catch(error) {
            console.trace(error);
            res.status(500).json({
                error: `Une erreur est survenue ${error.message}`
            });
        }
        
    },
    streamSound: async (req, res) => {
        try{
            const key = req.params.key;
            const sound = await Sound.findOne({where: {key: key}});
            await sound.update({score : sound.score + 1});
            const readStream = getFileStream(key);
            return readStream.pipe(res);

        }catch(err) {
            console.trace(err);
            res.status(401).send(err);
        }

    },
    patchSoundName : async (req, res, next) => {
        try {
            
            const targetId = req.params.id;
            const name = req.body.name;
            
            const sound = await Sound.findByPk(targetId);
            
            await sound.update({name : name});
            
            res.json(sound);
            
        } catch (error) {
            console.trace(error);
            res.status(500).json(error); 
        }
    },

    // Supprimer un son pour un membre
    
    deleteSound: async (req, res, next) => {
        try {
            const targetId = req.params.id;

            const nbDeletedSound = await Sound.destroy({
                where: {
                    id: targetId
                }
            });

            // Si y'a au moins 1 membre de supprimer alors :
            if (nbDeletedSound > 0) {
                res.json({message: "ok, son supprimé"});
            } else {
                next(); // On envoie une 404
            }

        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },
};

module.exports = soundController;