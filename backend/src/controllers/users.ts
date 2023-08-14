import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { setting } from '../config/config';
import {createUser, findUser} from '../dal/users';
import {validate} from "../models/users";
import { userInput } from '../models/users';
import { cartStructure } from '../models/cart';
import {createCart} from '../dal/carts';

export const register = async (req: Request, res: Response): Promise<void> => {
    const input: userInput = {
        email: req.body.email,
        password: req.body.password
    }
    const result = validate(input);
    if (result.error) res.status(400).send(result.error.details[0].message);
    
    if (await findUser(input.email)) {
        res.status(400);
        throw new Error('You Already Exist. Login Instead');
    } else {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const userObject = { email: input.email, password: hashedPassword };
        const user = await createUser(userObject);
        if (user) {
          const payload: cartStructure = {
            user: user._id
          }
          await createCart(payload);
          res.status(201).send(user);
        } 
        else {
            res.status(400);
            throw new Error('Invalid Data');
        }
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const input: userInput = {
    email: req.body.email,
    password: req.body.password
}
  const result = validate(input);
  if (result.error) res.status(400).send(result.error.details[0].message);

  const user = await findUser(input.email);

  if (user) {
    const hashedPassword: string = user.password;

    // Compare client password with db password
    if (await bcrypt.compare(input.password, hashedPassword)) {
      const accessToken = jwt.sign(
        //Payload
        {
          userDetails: {
            id: user._id,
            email: user.email
          }
        },
        //Access Token Secret Key
        setting.secretKey,
        // Options like token expiry
        { expiresIn: '4h' }
      );
      res.send({ Status: 'Logged in Successfully', Access_Token: accessToken });
    }
  } else {
    res.status(401);
    throw new Error('Email or Password are invalid');
  }
};
