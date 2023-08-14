import {Schema, model} from "mongoose";

export interface cartStructure {
    user: Schema.Types.ObjectId;
    flavours?: [{flavour: Schema.Types.ObjectId, name: string, count: number}];
}

const cart: Schema = new Schema<cartStructure>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    flavours: {
        type: [new Schema({
            flavour: {
                type: Schema.Types.ObjectId,
                ref: "Flavour"
            },
            name: {
                type: String
            },
            count: {
                type: Number,
                default: 0
            }
        })],
        default: []
    }
}, {timestamps: true});

interface CartModel extends cartStructure, Document {}

export const Cart = model<CartModel>("Cart", cart);
