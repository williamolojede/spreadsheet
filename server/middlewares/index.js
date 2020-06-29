import Joi from '@hapi/joi';

export const validateRequest = schema => (req, _, next) => {
  const schemaEntries = Object.entries(schema);
  

  for (let i = 0; i < schemaEntries.length; i += 1) {
    const [key, val] = schemaEntries[i];
    if (req[key]) {
      try {
        Joi.assert(req[key], val);
      } catch(err) {
        const error = new Error(err.details[0].message);
        error.statusCode = 400;
        return next(error);
      }
    }
  }

  next();
};