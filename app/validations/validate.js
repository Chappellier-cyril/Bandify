module.exports = (schema) => {

        return async (request, response, next) => {
            try {
                // la "value" on s'en fiche on la récupère pas
                // request['body'] == request.body
                await schema.validateAsync(request.body);
                console.log(schema)
                console.log('Youpiiii')
                next();
            
            } catch (error) {
                console.log(error)
                // Je dois afficher l'erreur à l'utilisateur
                // STATUS HTTP pour une errur de saise : 400
                return response.status(400).json({error});
            }
        }
    
    }