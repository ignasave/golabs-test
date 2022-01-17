import mongoose from 'mongoose';

import { UserDoc } from './User';

interface RecipeAttrs {
    title: string;
    description: string;
    duration: number;
    user: UserDoc;
}

interface RecipeModel extends mongoose.Model<RecipeDoc> {
    build: (attrs: RecipeAttrs) => RecipeDoc
}

interface RecipeDoc extends mongoose.Document {
    title: string;
    description: string;
    duration: number;
    user: UserDoc;
}

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: [
        {
            type: Number,
            required: true
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret.password;
            delete ret._id;
        }
    },
    versionKey: false
});

recipeSchema.statics.build = (attrs: RecipeAttrs) => {
    return new Recipe(attrs);
};

const Recipe = mongoose.model<RecipeDoc, RecipeModel>('Recipe', recipeSchema);

export { Recipe };


