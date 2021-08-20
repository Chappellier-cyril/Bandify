const { Member, Instrument, Level, Play } = require('../models');

// Member has instrument

const associationController = {

    MemberhasInstrument: async (req, res, next) => {
        try {
            
            const { member_id, instrument_id, level_id } = req.body;
            console.log(member_id);
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

};


module.exports = associationController; 