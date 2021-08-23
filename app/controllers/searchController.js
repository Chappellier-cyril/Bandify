const { Member, Play, Instrument, Level } = require('../models');

const searchController = {
  getFilteredMembers: async (req, res, next) => {
    const searchQuery = req.query.q;
    console.log('searchQuery dans searchController :', searchQuery);
    try {
        const members = await Member.findAll({
            include: ['member_city', {
                association: 'plays',
                include: ['instrument', 'level']
        }]});

        const filteredMembers = members.filter((member) => member.firstname.includes(searchQuery));

        console.log('filteredMembers : ', filteredMembers);

        res.json(filteredMembers);
    } catch (error) {
        console.trace(error);
        res.status(500).json(error);
    }
},
};

module.exports = searchController;