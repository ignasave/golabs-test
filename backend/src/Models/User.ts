import mongoose, { version } from 'mongoose';
import bcryot from 'bcryptjs'

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build: (attrs: UserAttrs) => UserDoc
}

export interface UserDoc extends mongoose.Document {
  email: string,
  password: string
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
      }
    },
    versionKey: false
  }
);


userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre('save', async function () {
  const hashedPassword = await bcryot.hash(this.password, 12)

  this.password = hashedPassword;
})

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };


