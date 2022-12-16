import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import  UserRepository from '../repositories/user.repository'

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserRepository.findAllUsers();
    res.status(StatusCodes.OK).send(users);
});

usersRoute.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    res.status(StatusCodes.OK).send({ uuid })
});

usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    console.log(req.body)

    res.status(StatusCodes.CREATED).send(newUser)
});

usersRoute.put('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body

    console.log(modifiedUser)
    res.status(StatusCodes.OK).send({ uuid });
});

usersRoute.delete('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {  
    res.sendStatus(StatusCodes.OK);
});

export default usersRoute;