import { Response } from "express";
import { requestWithUserData } from "../middleware/auth";
import { createOrder, getOrdersByUser } from "../dal/orders";
import { orderItem, orderStructure } from "../models/order";

const makeReference = (): string =>
  `BB-${Date.now().toString(36).toUpperCase()}`;

export const create = async (
  req: requestWithUserData,
  res: Response
): Promise<void> => {
  if (!req.currentUser) {
    res.status(401);
    throw new Error("User Unauthorised");
  }

  const items: orderItem[] = req.body.items;
  const total: number = req.body.total;

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("An order must contain at least one item");
  }
  if (typeof total !== "number") {
    res.status(400);
    throw new Error("A valid order total is required");
  }

  const payload: orderStructure = {
    user: req.currentUser.userDetails.id,
    reference: makeReference(),
    items,
    total,
  };

  const order = await createOrder(payload);
  res.status(201).send(order);
};

export const list = async (
  req: requestWithUserData,
  res: Response
): Promise<void> => {
  if (!req.currentUser) {
    res.status(401);
    throw new Error("User Unauthorised");
  }
  const orders = await getOrdersByUser(req.currentUser.userDetails.id);
  res.status(200).send(orders);
};
