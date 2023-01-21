import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors';

import codesMiddleware from './middlewares/codesMiddleware';
import exchangeMiddleware from './middlewares/exchangeMiddleware';

dotenv.config()

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.get('/codes', codesMiddleware);
app.post('/exchange', exchangeMiddleware);

export default app;
