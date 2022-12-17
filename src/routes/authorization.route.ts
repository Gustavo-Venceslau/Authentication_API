import { NextFunction, Request, Response, Router } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.models';
import UserRepository from '../repositories/user.repository';
import JWT from 'jsonwebtoken'

const authorizationRoute = Router();

authorizationRoute.post('/token', async (req: Request, res: Response, next: NextFunction) => {
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

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8')

        const [username, password] = tokenContent.split(':')
        
        if(!username || !password){
            throw new ForbiddenError('credencias não preenchidas');
        }

        const user = await UserRepository.findByUsernamePassword(username, password)

        console.log(user)
    }
    catch(error){
        next(error)
    }
});

export default authorizationRoute;