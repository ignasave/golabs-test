import express, { Request, Response } from 'express';
import { checkAuth, validationHandler } from '@gearthlogic/common';

import { Recipe } from '../../Models/Recipe';
import * as validations from './validations';

const router = express.Router();

router.post(
    '/api/recipes',
    checkAuth,
    validations.createRecipeValidation,
    validationHandler,
    async (req: Request, res: Response) => {
        const recipe = await Recipe.build(
            {
                ...req.body,
                user: req.user!.id
            }
        );

        await recipe.save();

        res.status(201).send(recipe);
    }
);


router.get(
    '/api/recipes',
    checkAuth,
    async (req: Request, res: Response) => {
        //@ts-ignore
        const recipes = await Recipe.find({ user: req.user!.id });

        res.status(200).send(recipes);
    }
);

export { router as recipeRouter };
