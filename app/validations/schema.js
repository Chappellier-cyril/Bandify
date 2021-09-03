const Joi = require('joi');

module.exports = Joi.object({
    firstname: Joi.string().min(6),
    lastname: Joi.string().min(6),
    email: Joi.string(),
    birthdate: Joi.number(),
    user_description: Joi.string(),
    user_password: Joi.string().min(4),
    city_code: Joi.number().integer(),
});

