import { Response } from 'express';
import {requestWithUserData} from "../middleware/auth";
import {createCart, displayCart} from '../dal/carts';
import { cartStructure, Cart } from '../models/cart';
import { Schema } from 'mongoose';

export const create = async (req: requestWithUserData, res: Response): Promise<void> => {
    if (req.currentUser){
        const payload: cartStructure = {
            user: req.currentUser.userDetails.id
        }
        const cartExists = await displayCart(req.currentUser.userDetails.id);
        if (cartExists){
            res.status(400);
            throw new Error('Cart Exists');
        }
        const cart = await createCart(payload);
        if (cart) {
            res.status(201).send(cart);
        } 
        else {
            res.status(400);
            throw new Error('Invalid Data');
        }
    }
    else{
            res.status(400);
            throw new Error('User Unauthorised');
    }
    
    
    
};

export const display = async (req: requestWithUserData, res: Response): Promise<void> => {
    if (req.currentUser){
        const cart = await displayCart(req.currentUser.userDetails.id);
        if (cart){
            res.status(200).send(cart);
        }
        else {
            res.status(404);
            throw new Error('No Cart Found');
        }
    }
    else{
        res.status(400);
        throw new Error('User Unauthorised');
    }
};

export const update = async (req: requestWithUserData, res: Response): Promise<void> => {
    if (req.currentUser){
        const user = req.currentUser.userDetails.id;
        const flavours: [{flavour:Schema.Types.ObjectId, name:string, count: number}] = req.body.flavours;
        await Cart.findOneAndUpdate(
            { user },
            { $set: { flavours: [] } },
          );
        const cart = await Cart.findOneAndUpdate(
            { user },
            { $push: { flavours: { $each: flavours } } },
            { new: true }
          );
        res.status(200).send(cart);
    }
    else{
        res.status(400);
        throw new Error('User Unauthorised');
    }
};
