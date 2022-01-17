import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validationHandler, BadRequestError, currentUser } from '@gearthlogic/common';

import * as validations from './validations';
import { User } from '../../models/User';

const router = express.Router();

router.post(
  '/api/users/signup',
  validations.signupValidation,
  validationHandler,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) throw new BadRequestError("Email in use");

    const user = User.build({ email, password })

    await user.save()

    const userJWT = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_SECRET!);

    req.session = { jwt: userJWT };

    res.status(201).send(user);
  }
);

router.post(
  '/api/users/signin',
  validations.signinvalidation,
  validationHandler,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) throw new BadRequestError('invalid email');

    if (!await bcrypt.compare(password, existingUser.password)) {
      throw new BadRequestError('invalid password');
    }

    const userJWT = jwt.sign({
      id: existingUser.id,
      email: existingUser.email
    }, process.env.JWT_SECRET!);

    req.session = { jwt: userJWT };

    res.status(200).send(existingUser);
  }
);

router.get(
  '/api/users/currentuser',
  currentUser,
  (req, res) => {
    return res.send(req.user);
  }
);

router.post('/api/users/signout', (req, res) => {
  req.session = null;

  res.send("Ok");
});

export { router as authRouter };