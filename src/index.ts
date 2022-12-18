import express, { Request, Response, NextFunction} from 'express';
import bearerAuthenticationMiddleware from './middleware/bearer-authentication.middleware';
import errorHandler from './middleware/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

app.use(express.json());
// para entender se ulr é uma string e etc
app.use(express.urlencoded({ extended: true }))

app.use(bearerAuthenticationMiddleware ,usersRoute)
app.use(statusRoute)
app.use(authorizationRoute)

// configuração dos haddlers de error

app.use(errorHandler)

app.listen(3000, () => {
    console.log('aplication is running');
});