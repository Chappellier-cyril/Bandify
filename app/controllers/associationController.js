const { Member, Instrument, Level, Play, MusicStyle } = require('../models');

// Member has instrument

const associationController = {

    MemberhasInstrument: async (req, res, next) => {
        try {
            
            const { member_id, instrument_id, level_id } = req.body;
            // console.log(member_id);
            const member = await Member.findByPk(Number(member_id));
            const instrument = await Instrument.findByPk(Number(instrument_id));
            if (level_id) {
              const level = await Level.findByPk(Number(level_id));
              if (!level) return next();
              const association =  await Play.findOrCreate({
                where : {
                 member_id : Number(member_id),
                 instrument_id: Number(instrument_id),
                 level_id: Number(level_id)
                }
              });
              console.log(association);
              res.send({association: association});
              return next();
            }
            if (!member || !instrument) {
                return next();
            }

          const association =  await Play.findOrCreate({
                   where : {
                    member_id : Number(member_id),
                    instrument_id: Number(instrument_id)
                  }
          });
            res.send({message: association});


        } catch (error) {   
            console.trace(error);
            res.status(500).json(error);
        }
    },

    MemberhasMusicStyle: async (req, res, next) => {
      try {
          
          const { member_id, music_style_id } = req.body;
          const member = await Member.findByPk(Number(member_id));
          const music_style = await MusicStyle.findByPk(Number(music_style_id));
      
        
          if (!member || !music_style) {
              return next();
          }

        const association =  await Play.findOrCreate({
                 where : {
                  member_id : Number(member_id),
                  instrument_id: Number(music_style_id)
                }
        });
          res.send({MemberhasMusicStyle: association});


      } catch (error) {   
          console.trace(error);
          res.status(500).json(error);
      }
  },

};


module.exports = associationController; 