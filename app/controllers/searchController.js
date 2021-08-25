const { Member, Play, Instrument, Level } = require('../models');

const searchController = {
  getFilteredMembersByFirstname: async (req, res, next) => {
        const searchQuery = req.query.q;
        console.log('searchQuery dans searchController :', searchQuery);
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
            
            const filteredMembers = members.filter((member) => member.firstname.includes(searchQuery));

            console.log('filteredMembers : ', filteredMembers);

            res.json(filteredMembers);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },

     // filtres conditionnels
     getFilteredMembers: async (req, res, next) => {
        const filteredQuery = req.query;
        const { instrument, level, musicstyle, city, department, region } = filteredQuery;
    
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

            // TESTS
            // console.log(members[0].dataValues.styles[0].music_name);
            // console.log(members[2].dataValues.plays[0].instrument.instrument_name);
            
            // if (instrument && level && musicstyle && city && department && region) {
            //     const membersToFilter = members.filter((member) => 
            //     member.styles[0].music_name === musicstyle &&
            //     member.plays[0].instrument.instrument_name === instrument &&
            //     member.plays[0].level.level_name === level && 
            //     member.city.city_name === city &&
            //     member.city.department.department_name === department &&
            //     member.city.department.region.region_name === region
            // );
            let membersToFilter = [...members];

            if (musicstyle) membersToFilter = membersToFilter.filter((member) => {
                console.log('je passe dans musicstyle');
                return member.styles[0].music_name === musicstyle;
            }) 

            if (instrument) membersToFilter = membersToFilter.filter((member) => {
                console.log('je passe dans instrument');
                return member.plays[0].instrument.instrument_name === instrument;
            })

            if (level) membersToFilter = membersToFilter.filter((member) => {
                console.log('je passe dans level');
                return member.plays[0].level.level_name === level;
            }) 

            if (city) membersToFilter = membersToFilter.filter((member) => {
                console.log('je passe dans city');
                return member.city.city_name === city;
            })

            if (department) membersToFilter = membersToFilter.filter((member) => {
                console.log('je passe dans department');
                return member.city.department.department_name === department;
            }) 

            if (region) membersToFilter = membersToFilter.filter((member) => {
                console.log('je passe dans region');
                return member.city.department.region.region_name === region;
            }) 

            // console.log('filteredQuery.instrument :', instrument);
            
            console.log('membersToFilter :', membersToFilter);
            // }
            
        
            res.json(membersToFilter);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }

       
    }, 
};

module.exports = searchController;