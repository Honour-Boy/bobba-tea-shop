import {Schema, model} from "mongoose";
import Joi from "joi";

export interface userInput {
    _id?: Schema.Types.ObjectId;
    email: string;
    password: string;
}

export interface user {
    _id: Schema.Types.ObjectId;
    email: string;
    password: string;
}

const user: Schema = new Schema<userInput>({
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

export const User = model<UserModel>("Users", user);

export function validate(user: userInput) {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().pattern(new RegExp ('^(?=.*[!@#$%^&(),.?":{}|<>])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$')).required()
    })

    return schema.validate(user);
};
