import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { setting } from '../config/config';
import {createVolunteer, findVolunteer} from '../dal/users';
import {validate} from "../models/users";
import { volunteerInput } from '../models/users';

export const register = async (req: Request, res: Response): Promise<void> => {
    const input: volunteerInput = {
        email: req.body.email,
        password: req.body.password
    }
    const result = validate(input);
    if (result.error) res.status(400).send(result.error.details[0].message);
    
    if (await findVolunteer(input.email)) {
        res.status(400);
        throw new Error('You Already Exist. Login Instead');
    } else {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const volunteerObject = { email: input.email, password: hashedPassword };
        const volunteer = await createVolunteer(volunteerObject);
        if (volunteer) {
            res.status(201).send(volunteer);
        } 
        else {
            res.status(400);
            throw new Error('Invalid Data');
        }
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const input: volunteerInput = {
    email: req.body.email,
    password: req.body.password
}
  const result = validate(input);
  if (result.error) res.status(400).send(result.error.details[0].message);

  const volunteer = await findVolunteer(input.email);

  if (volunteer) {
    const hashedPassword: string = volunteer.password;

    // Compare client password with db password
    if (await bcrypt.compare(input.password, hashedPassword)) {
      const accessToken = jwt.sign(
        //Payload
        {
          userDetails: {
            email: volunteer.email
          }
        },
        //Access Token Secret Key
        setting.accessToken,
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
