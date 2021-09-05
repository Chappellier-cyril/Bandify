const { Member, Play, Instrument, Level } = require('../models');
const memberController = require('./memberController');

const searchController = {
     getFilteredMembers: async (req, res, next) => {
        const filteredQuery = req.query;
        // Destructuring de la recherche
        const { instrument, level, musicstyle, city, department, region, searchValue } = filteredQuery;
        //on récupère tous les mebres pour pouvoir filtrer en fonction des queries
        try {
            const members = await Member.findAll();
            // on copie les members dans une variable pour récupérer les users filtrés après la recherche
            let membersToFilter = [...members];

            // Si ma recherche contient un champs searchValue (barre de recherche), je filtre les members par leur noms/prénoms/les deux
            if (searchValue) membersToFilter = membersToFilter.filter((member) => {
                const memberFullName = member.firstname + ' ' + member.lastname;

                if (member.firstname || member.lastname || memberFullName) {
                    return member.firstname.toLowerCase() === searchValue.toLowerCase() 
                    || member.lastname.toLowerCase() === searchValue.toLowerCase()
                    || memberFullName.toLowerCase() === searchValue.toLowerCase();
                } 
            })
            
            // Si ma recherche contient un champs musicstyle, je filtre les members qui ont un style correspondant
            if (musicstyle) membersToFilter = membersToFilter.filter((member) => {
                // Si le membre a une association avec un/des style(s) de musiques ...
                if(member.styles[0]){
                    // ... on FIND si le style correspond à la recherche
                    const foundSearched = member.styles.find((style) => {
                        return style.music_name === musicstyle;
                    })
                    // on retourne le résultat de la recherche par style
                    return foundSearched;
                }
                
            }) 
             // Si ma recherche contient un champs instrument, je filtre les members qui ont un instrument correspondant
            if (instrument) membersToFilter = membersToFilter.filter((member) => {
                // Si le membre a une association avec un instrument ...
                if (member.plays[0]) {
                    // ... on FIND si l'instrument correspond à la recherche
                    const foundSearched = member.plays.find((play) => {
                       return play.instrument.instrument_name === instrument;
                    });
                    // on retourne le résultat de la recherche par style
                    return foundSearched;
                }
            })
            // Si ma recherche contient un champs instrument ET un champs level, je filtre les members qui ont un instrument correspondant
            // On n'accorde pas le droit à l'utilisateur de rechercher juste par level... il faut absolument un instrument car ils sont associés
            if (instrument && level) membersToFilter = membersToFilter.filter((member) => {
                // Si le membre a une association avec un instrument ...
                if (member.plays[0]) {
                    const foundSearched = member.plays.find((play) => {
                        // Si le membre a une association avec un instrument ET un level ...
                        if(play.level){
                            return play.instrument.instrument_name === instrument && play.level.level_name === level;
                        }
                    });
                    // on retourne le résultat de la recherche par style
                    return foundSearched;
                }
            });
            // On filtre la recherche par Ville 
            if (city) membersToFilter = membersToFilter.filter((member) => {
                return member.city.city_name === city;
            })
            // On filtre la recherche par Département si on a pas de ville
            //Pour éviter à l'utilisateur d'envoyé une requête incohérente entre dpt et ville
            if (department && !city) membersToFilter = membersToFilter.filter((member) => {
                return member.city.department.department_name === department;
            }) 
            // On filtre la recherche par Région si on a pas de ville ET si on a pas de département
            //Pour éviter à l'utilisateur d'envoyé une requête incohérente entre region et dpt et ville
            if (region && !city && !department) membersToFilter = membersToFilter.filter((member) => {
                return member.city.department.region.region_name === region;
            }) 
            // On envoi le résultat de la recherche de l'utilisateur  contenu dans la variable membersToFilter
            res.json(membersToFilter);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }

       
    }, 
};

module.exports = searchController;