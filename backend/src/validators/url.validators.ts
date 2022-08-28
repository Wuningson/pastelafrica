import Joi from 'joi';

export const CreateUrlValidator = Joi.object({
  url: Joi.string().uri().required(),
});
