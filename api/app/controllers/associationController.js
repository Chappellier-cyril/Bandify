const { Member, Instrument, Level, Play, MusicStyle } = require('../models');

const associationController = {
  // CONTROLLERS DES ASSOCIATIONS MEMBER/INSTRUMENTS/LEVELS via la table PLAY
  getMemberInstruments: async (req, res, next) => {
    try {
      const memberId = req.params.id;
      const member = await Play.findAll({
        where : {
          member_id : memberId,
        },
        include: ['instrument', 'level'],
      })
      return res.json(member);
    } catch(error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
  createAssociation: async (req, res, next) => {
    try{
      const memberId = req.params.id;
      const {instrument_id, level_id} = req.body;
      const newAssociation = await Play.create({
        member_id: memberId,
        instrument_id: instrument_id,
        level_id: level_id,
      });
      const newPlay = await Play.findByPk(newAssociation.id, {include: ['instrument', 'level']});
      res.json(newPlay);
    }catch(error){
      console.trace(error);
      res.status(500).json(error);
    }
  },
  updateMemberInstruments: async (req, res, next) => {
        try {
          //Je récupère les paramètres de la requête PATCH, ici l'id du membre 
          const memberId = Number(req.params.id);
          //Je récupère les paramètres du body, un instrument_id et/ou un level 
          const instrumentId = Number(req.body.instrument_id);
          const levelId = Number(req.body.level_id) || null;
          //Je vérifie que le membre et l'instrument sont bien des numbers et qu'ils existe bien en BDD, sinon je sort
          if(memberId === NaN || instrumentId === NaN) return next();
          const member = await Member.findByPk(memberId);
          const instrument = await Instrument.findByPk(instrumentId);
          // Si au moins 1 des 2 n'existent pas on return
          if(!member || !instrument) return next();
          //on vérifie si une association existe déjà entre le membre et l'instrument
          const alreadyExist = await Play.findOne({where : {
            member_id : memberId,
            instrument_id: instrumentId,
          }});
          // Si on trouve une association et que l'utilisateur n'as pas envoyer de level_id, on return car l'association existe déjà
          if(alreadyExist && !levelId){
            return next();
          } else if (!alreadyExist && !levelId) {
            await Play.findOrCreate({
              where : {
                member_id : memberId,
                instrument_id: instrumentId,
              }
            });
            const member = await Play.findAll({
              where : {
                member_id : memberId,
              },
              include: ['instrument', 'level'],
            })
            return res.json(member);
          }
          // Si on trouve une association on la supprime car ici le membre peut juste vouloir updater son niveau, on associe donc les 3 (user, instru, level)
          if (levelId && levelId !== NaN) {
            if(alreadyExist) alreadyExist.destroy();
            const level = await Level.findByPk(levelId);
            if (!level) return next();
            await Play.findOrCreate({
              where : {
                member_id : memberId,
                instrument_id: instrumentId,
                level_id: levelId
              }
            });
            // on renvoi toute les associations instruments / levels correspondantes au membre
            const member = await Play.findAll({
              where : {
                member_id : memberId,
              },
              include: ['instrument', 'level'],
            })
            return res.json(member);
          };
          // Si le level_id n'a pas été renseigner par l'utilisateur on associe le membre et l'instrument, si l'association n'existe pas déjà
          if(!levelId) {
            await Play.findOrCreate({
              where : {
                member_id : Number(member_id),
                instrument_id: Number(instrument_id)
              }
            });
            // on renvoi toute les associations instruments / levels correspondantes au membre
            const member = await Play.findAll({
              where : {
                member_id : memberId,
              },
              include: ['instrument', 'level'],
            })
            return res.json(member);
          }

        } catch (error) {   
            console.trace(error);
            res.status(500).json(error);
        }
  },
  deleteMemberInstruments: async (req, res, next) => {
    try {
      //Je récupère les paramètres de la requête DELETE, ici l'id du membre 
      const memberId = Number(req.params.id);
      //Je récupère les paramètres du body, un instrument_id
      const instrumentId = Number(req.body.instrument_id);
      //Je vérifie que le membre et l'instrument sont bien des numbers et qu'ils existe bien en BDD, sinon je sort
      if(memberId === NaN || instrumentId === NaN) return next();
      const member = await Member.findByPk(memberId);
      const instrument = await Instrument.findByPk(instrumentId);
      // Si au moins 1 des 2 n'existent pas on return
      if(!member || !instrument) return next();
      //on vérifie si une association existe déjà entre le membre et l'instrument
      const alreadyExist = await Play.findOne({where : {
        member_id : memberId,
        instrument_id: instrumentId,
      }});
      if(alreadyExist) {
        alreadyExist.destroy();
        return res.json({message : 'Delete Association Member Instruments Successfull'})
      };
      // Si il n'y a rien a supprimer on next jsuqu'a la 404
      next();
    } catch(error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // CONTROLLERS DES ASSOCIATIONS MEMBER/MusicStyles
  getMemberMusicStyles: async (req, res, next) => {
    try {
      const memberId = Number(req.params.id);
      const member = await Member.findByPk(memberId, {include: 'styles'});
      return res.json(member);
    } catch(error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
  updateMemberMusicStyles: async (req, res, next) => {
      try {
        //Je récupère les paramètres de la requête PATCH, ici l'id du membre en params et musicStyle_id en body
        const memberId = Number(req.params.id);
        const musicStyleId = Number(req.body.musicstyle_id);
        // Si un paramètre à mal été renseigné (autre que nombre) ou est manquant on next
        if((!musicStyleId || musicStyleId === NaN) || (!memberId || memberId === NaN)) return next();
        //on recherche si le membre et le style existe bien
        const member = await Member.findByPk(memberId, {
          include: 'styles'
        });
        const musicStyle = await MusicStyle.findByPk(musicStyleId);
        // Si a  u moins un des 2 n'existe pas, on next  
        if (!member || !musicStyle) {
            return next();
        }
        // Sinon on fait l'association => Sequelize nous met à disposition une methode addStyle
        await member.addStyle(musicStyle);
        // on renvoi le membre updaté avec son association syur les styles
        const memberUpdate = await Member.findByPk(memberId, {include: 'styles'});
        return res.json(memberUpdate);


      } catch (error) {   
          console.trace(error);
          res.status(500).json(error);
      }
  },
  deleteMemberMusicStyles: async (req, res, next) => {
    try {
      //Je récupère les paramètres de la requête PATCH, ici l'id du membre en params et musicStyle_id en body
      const memberId = Number(req.params.id);
      const musicStyleId = Number(req.body.musicstyle_id);
      // Si un paramètre à mal été renseigné (autre que nombre) ou est manquant on next
      if((!musicStyleId || musicStyleId === NaN) || (!memberId || memberId === NaN)) return next();
      //on recherche si le membre et le style existe bien
      const member = await Member.findByPk(memberId, {
        include: 'styles'
      });
      const musicStyle = await MusicStyle.findByPk(musicStyleId);
      // Si a  u moins un des 2 n'existe pas, on next  
      if (!member || !musicStyle) {
          return next();
      }
      const filteredStyles = member.styles.find((style) => style.id === musicStyleId);
      if(filteredStyles){
        await member.removeStyle(musicStyleId);
        const memberUpdated = await Member.findByPk(memberId, {
          include: 'styles'
        });
        return res.json(memberUpdated);
      }
      next();
    } catch(error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
  addMemberMusicStyle: async (req, res, next) => {
    try{
      const memberId = req.params.id;
      const musicstyleId = req.body.musicstyle_id;
      const member = await Member.findByPk(memberId);
      await member.addStyle(Number(musicstyleId));
      return res.json({message: 'Successfull add style'});
    } catch(error) {
      console.trace(error);
      res.status(500).json(error);
    }

  },
};


module.exports = associationController; 