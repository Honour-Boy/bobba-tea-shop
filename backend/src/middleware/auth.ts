import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { setting } from '../config/config';
import { Schema } from 'mongoose';

export interface UserPayload {
	userDetails: {
		email: string;
		id: Schema.Types.ObjectId;
	};
	iat: number;
	exp: number;
}
export interface requestWithUserData extends Request {
	currentUser?: UserPayload;
}

export const auth = async (
	req: requestWithUserData,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const token: string | undefined = req.header('auth-token');
	if (!token) {
		res.status(401).send({
			Title: 'Error',
			Message: 'User is not Authorized or Token is missing'
		});
		throw new Error('User is not Authorized or Token is missing ');
	} else {
		try {
			const payload = jwt.verify(token, setting.secretKey) as UserPayload;
			req.currentUser = payload;
			console.log(payload);
			
			next();
		} catch (error) {
			res.status(401).send({
				Title: 'Error',
				Message: `${error}`
			});
			next(error);
		}
	}
};