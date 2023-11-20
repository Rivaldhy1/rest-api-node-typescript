import Joi from 'joi'
import userTypes from '../types/user.type'

export const createUserValidation = (payload: userTypes) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}
