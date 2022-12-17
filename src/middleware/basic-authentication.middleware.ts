import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.models";
import userRepository from "../repositories/user.repository";

async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction){
    try{
        const authorizationHeader = req.headers['authorization'];
        if(!authorizationHeader){
            // não fazer declaraçoes de erros tão sugestivas! trocar mensagem
            throw new ForbiddenError('Credenciais não informadas');
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Basic' || !token){
            throw new ForbiddenError('Tipo de authentication inválido');
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

        const [username, password] = tokenContent.split(':');
        
        if(!username || !password){
            throw new ForbiddenError('credencias não preenchidas');
        }

        const user = await userRepository.findByUsernamePassword(username, password);

        if(!user){
            throw new ForbiddenError('usuario e senha invalidos');
        }

        req.user = user;
        next();
    }
    catch(error){
        next(error)
    }
}

export default basicAuthenticationMiddleware;