import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.models";
import JWT from 'jsonwebtoken'
import userRepository from "../repositories/user.repository";

async function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction){
    try{
        
        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader){
            throw new ForbiddenError('Credencias não informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Bearer' || !token){
            throw new ForbiddenError('Tipo de authentication inválido');
        }

        const tokenPayLoad = JWT.verify(token, 'my_secret_key');

        if(typeof tokenPayLoad !== 'object' || !tokenPayLoad.sub){
            throw new ForbiddenError('Token inválido');
        }

        const user = { 
            uuid: tokenPayLoad.sub, 
            username: tokenPayLoad.username 
        };
        req.user = user;
        next();
    }
    catch(error){
        next(error);
    }
}

export default bearerAuthenticationMiddleware;