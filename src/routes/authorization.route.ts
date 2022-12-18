import { NextFunction, Request, Response, Router } from 'express';
import ForbiddenError from '../models/errors/forbidden.error.models';
import userRepository from '../repositories/user.repository';
import JWT from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes';
import basicAuthenticationMiddleware from '../middleware/basic-authentication.middleware';
import jwtAuthenticationMiddleware from '../middleware/jwt-authentication.middleware';

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = req.user

        if(!user){
            throw new ForbiddenError('usuário não informado')
        }

        const jwtPayLoad = { username: user.username };
        const jwtOptions = { subject: user?.uuid };
        const secretKey = 'my_secret_key';

        const jwt = JWT.sign(jwtPayLoad, secretKey, jwtOptions);

        res.status(StatusCodes.OK).json({ token: jwt })

        console.log(user)
    }
    catch(error){
        next(error)
    }
});

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware,(req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
})

export default authorizationRoute;