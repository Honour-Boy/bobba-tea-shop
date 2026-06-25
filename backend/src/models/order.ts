import { Schema, model } from "mongoose";

export interface orderItem {
  name: string;
  count: number;
  price: number;
}

export interface orderStructure {
  user: Schema.Types.ObjectId;
  reference: string;
  items: orderItem[];
  total: number;
}

const order: Schema = new Schema<orderStructure>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    items: {
      type: [
        new Schema(
          {
            name: { type: String, required: true },
            count: { type: Number, required: true },
            price: { type: Number, required: true },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

interface OrderModel extends orderStructure, Document {}

export const Order = model<OrderModel>("Order", order);
