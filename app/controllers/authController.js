const {Member} = require('../models')

const authController = {

checkPassword : async (req, res) => {

    const targetId = req.params.id;
    try {
    
      const password = await Member.findByPk({
          where: {
              id : targetId,
              password: req.body.user_password
          },
      });
      console.log(password)

      if(!password) {
        throw({error : 'Mot de passe incorrects'});
      }
  
      const memberPassword = member.user_password;

      const isPasswordValid = await bcrypt.compare(req.body.user_password, memberPassword);

      // Si le mot de passe n'est pas valide on passe dans le catch
      if(!isPasswordValid) {
        throw({error : 'Mot de passe incorrects!'});
      }

      // JWT Config
      const jwtSecret = process.env.TOKEN_SECRET;
      const jwtContent = { memberId: member.id };
      const jwtOptions = { 
      algorithm: 'HS256', 
      expiresIn: '3h' 
    };
      // Envoi de la réponse au front si tout est ok
      
    res.json({message: "Succes"});

    } catch(error) {
        res.json({error: "t'es pas au bonne endroit boby"})
    }
},
}

module.exports = authController;