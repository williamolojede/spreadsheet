import Joi from "@hapi/joi";

export const saveCellSchema = {
  body: Joi.object({
    column: Joi.string().required().pattern(/^[A-J]$/), 
    rowId: Joi.number().required().max(10).min(1), 
    value: Joi.string().required(),
  }),
};
