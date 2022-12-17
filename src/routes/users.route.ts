import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import DatabaseError from '../models/errors/database.error.models';
import userRepository from '../repositories/user.repository';
import  UserRepository from '../repositories/user.repository'

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserRepository.findAllUsers();
    res.status(StatusCodes.OK).send(users);
});

usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const user = await UserRepository.findById(uuid)
        res.status(StatusCodes.OK).send({ user })
    }
    catch(error){
        next(error)
    }
});

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const uuid = await UserRepository.create(newUser)
    res.status(StatusCodes.CREATED).send(uuid)
});

usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body

    modifiedUser.uuid = uuid

    await userRepository.update(modifiedUser)
    res.status(StatusCodes.OK).send();
});

usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {  
    const uuid = req.params.uuid
    await UserRepository.remove(uuid)
    res.sendStatus(StatusCodes.OK);
});

export default usersRoute;