const {Member} = require('../models')
const bcrypt = require('bcrypt')

const authController = {

checkPassword : async (req, res) => {

try {
    
    const targetId = req.params.id;
    const member = await Member.findByPk(targetId);
  
    const memberPassword = member.user_password;

    const isPasswordValid = await bcrypt.compare(req.body.user_password, memberPassword);

      // Si le mot de passe n'est pas valide on passe dans le catch
    if(!isPasswordValid) {
        res.json({error : 'Mot de passe incorrects!'});
    }else {

           // JWT Config
    const jwtSecret = process.env.TOKEN_SECRET;
    const jwtContent = { memberId: member.id };
    const jwtOptions = { 
      algorithm: 'HS256', 
      expiresIn: '3h' 
        };
          
    res.json({message: "Succes"});
    }

} catch(error) {
        res.status(500).json(error)
    }
},
}

module.exports = authController;