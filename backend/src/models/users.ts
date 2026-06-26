import Joi from "joi";

export interface userInput {
    _id?: string;
    email: string;
    password: string;
}

export interface user {
    _id: string;
    email: string;
    password: string;
}

export function validate(user: userInput) {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().pattern(new RegExp ('^(?=.*[!@#$%^&(),.?":{}|<>])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$')).required()
    })

    return schema.validate(user);
};
