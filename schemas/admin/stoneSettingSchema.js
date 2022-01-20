import Joi from "joi";
import { descriptionSchema, idSchema, imageSchema } from "./customOrdersSchema";

export const stoneSettingsSchema = Joi.object({
  id: idSchema,
  image: imageSchema,
  description: descriptionSchema,
  enabled: Joi.boolean().required(),
});
