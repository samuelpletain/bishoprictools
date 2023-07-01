import { Schema, model, ObjectId } from 'mongoose';

interface User {
  memberId: ObjectId,
  googleId: string
}

const userSchema = new Schema<User>({
  memberId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  googleId: {
    type: String,
    required: true
  }
});

const User = model<User>('User', userSchema);

export = User
