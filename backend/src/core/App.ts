import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
const cors = require('cors');
import { errorHandler, NotFoundError } from '@gearthlogic/common';

import { authRouter } from '../controllers/auth';
import { recipeRouter } from '../controllers/recipes';


dotenv.config();
const app = express();
app.use(json());
app.use(cors({ credentials: true, origin: true}));

app.use(
	cookieSession({
		secure: process.env.NODE_ENV !== 'test',
		signed: false,
	}, )
);

app.use(authRouter);
app.use(recipeRouter);

app.all('*', async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
