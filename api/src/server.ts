import express from 'express';
import 'dotenv/config';
import db, {connect, disconnect} from './db';

import cors from 'cors';
import logger from 'morgan';
import userRoute from './routes-user';

connect()

const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended: true}));
App.use(cors());
App.use(logger("tiny"));

App.get('/', (req: any, res: any)=>{
res.status(200).send(`Welcome to ChatAppShree API`)
});//end;

App.use('/users', userRoute);

export default App;