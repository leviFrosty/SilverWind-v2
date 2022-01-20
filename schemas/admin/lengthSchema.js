import Joi from "joi";

const lengthSchema = Joi.number().min(10).max(99).required();

export default lengthSchema;
