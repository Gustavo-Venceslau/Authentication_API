import express, { Request, Response, NextFunction} from 'express';
import errorHandler from './middleware/error-handler.middleware';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

app.use(express.json());
// para entender se ulr é uma string e etc
app.use(express.urlencoded({ extended: true }))

app.use(usersRoute)

app.use(statusRoute)

// configuração dos haddlers de error

app.use(errorHandler)

app.listen(3000, () => {
    console.log('aplication is running');
});