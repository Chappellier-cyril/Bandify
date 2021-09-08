// // Importation de l' utilitaire Joi pour la validation du formulaire d' inscription

// const Joi = require('joi')

// const memberSchema = Joi.object({

//     email: Joi.string()
//         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr' ,'io']  }})
//         .required()
//         .lowercase(),


//     user_password: Joi.string()
//         .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

//     repeat_password: Joi.ref('password'),

//     firstname: Joi.string()
//         .min(1)
//         .max(30)
//         .required(),

//     lastname: Joi.string()
//         .min(1)
//         .max(30)
//         .required(),


//     city_code: Joi.string(),
    

//     user_description: Joi.string()
//         .max(700),


//     profil_image: Joi.string(),

//     // access_token: [
//     //     Joi.string(),
//     //     Joi.number()
//     // ],
    
// })
// .with('password', 'repeat_password')



// module.exports= memberSchema