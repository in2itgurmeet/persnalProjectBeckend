// validations/user.validation.js
const Joi = require('joi');
const registerSchema = Joi.object({
  name: Joi.string().max(50).required(),
  
  username: Joi.string()
    .pattern(/^[A-Za-z0-9_]+$/)
    .min(5)
    .max(15)
    .required(),
  
  email: Joi.string().email().required(),
  
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$^&*%])[A-Za-z\d@$^&*%]{8,20}$/)
    .required(),
  
  roleName: Joi.string().valid('USER', 'ADMIN').default('USER')
});

// Update profile validation (all fields optional)
const updateSchema = Joi.object({
  name: Joi.string().max(50),
  
  username: Joi.string()
    .pattern(/^[A-Za-z0-9_]+$/)
    .min(5)
    .max(15),
  
  email: Joi.string().email(),
  
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/),
  
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$^&*%])[A-Za-z\d@$^&*%]{8,20}$/),
  
  roleName: Joi.string().valid('USER', 'ADMIN'),
  profileImg: Joi.string().uri(),
  dob: Joi.date(),
  identity: Joi.string(),
  married: Joi.string().valid('yes', 'no'),
  anniversaryDate: Joi.date(),
  pincode: Joi.string().pattern(/^[0-9]{6}$/),
  addressLine1: Joi.string(),
  addressLine2: Joi.string(),
  city: Joi.string(),
  state: Joi.string()
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});
module.exports = {
  registerSchema,
  updateSchema,
  loginSchema
};
