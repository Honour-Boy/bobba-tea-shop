import {Schema, model} from "mongoose";

export interface flavourInput {
    name: string;
    price: number;
    image: string;
}

const flavour: Schema = new Schema<flavourInput>({
    name: {
        type: String,
    },
    price: {
        type: Number
    },
    image: {
        type: String
    }
}, {timestamps: true});

interface FlavourModel extends flavourInput, Document {}

export const Flavour = model<FlavourModel>("Flavour", flavour);
