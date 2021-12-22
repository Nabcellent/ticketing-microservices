import Joi from 'joi'

const register = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(4).max(20).required(),
})

export default {register}