import {Schema, model} from "mongoose";
import Joi from "joi";

export interface userInput {
    email: string;
    password: string;
}

const volunteer: Schema = new Schema<userInput>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

interface UserModel extends userInput, Document {}

export const User = model<UserModel>("Volunteers", volunteer);

export function validate(volunteer: userInput) {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().pattern(new RegExp ('^(?=.*[!@#$%^&(),.?":{}|<>])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$')).required()
    })

    return schema.validate(volunteer);
};
