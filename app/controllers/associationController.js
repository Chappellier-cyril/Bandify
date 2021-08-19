const { Member, Instrument, Level } = require('../models');

// Member has instrument

const associationController = {

    MemberhasInstrument: async (req, res, next) => {
        try {
            
            const { member_id, instrument_id } = req.body;
            console.log(req.body)
            console.log(Number(member_id))
            console.log(instrument_id)
            
            const member = await Member.findByPk(Number(member_id));
            // console.log(member);
            const instrument = await Instrument.findByPk(Number(instrument_id));
            // console.log(instrument.dataValues);

            if (!member || !instrument) {
                return next();
            }

            await member.addInstrument(instrument);

            res.json({message: "association réussie"});


        } catch (error) {   
            console.trace(error);
            res.status(500).json(error);
        }
    },

};


module.exports = associationController; 