import Joi from "joi";

export const registerUserSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  cohort: Joi.number(),
  email: Joi.string().email(),
  phone_number: Joi.string().min(10),
  password: Joi.string(),
});
