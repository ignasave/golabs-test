import { body } from 'express-validator';

export const createRecipeValidation = [
    body('title')
        .isLength({ min: 3, max: 48})
        .withMessage('title must have at least 3 characters and less than 48'),
    body('description')
        .isLength({ min: 10, max: 240})
        .withMessage('Description must have at least 10 characters and less than 240'),
    body('duration')
        .isNumeric()
        .withMessage('Recipe must have at least 1 ingredient')
]