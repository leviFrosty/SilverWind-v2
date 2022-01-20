import Joi from "joi";

export const signupSchema = Joi.object({
  email: Joi.string().email({tlds: false}).required(),
  password: Joi.string().trim().min(8).max(40).required(),
  firstName: Joi.string().alphanum().trim().min(3).max(40).required(),
  lastName: Joi.string().alphanum().trim().min(3).max(40).required(),
  gender: Joi.string().alphanum().required()
});
