import { Schema, model, ObjectId } from 'mongoose';

interface Member {
  firstName: String
  lastName: String
  email: String
  password: String
  admin: boolean
  ageGroup: String
  wardId: ObjectId
  organizationId: ObjectId
}

const memberSchema = new Schema<Member>({
  firstName: {
    type: Schema.Types.String,
    required: true
  },
  lastName: {
    type: Schema.Types.String,
    required: true
  },
  email: {
    type: Schema.Types.String,
    default: null
  },
  password: {
    type: Schema.Types.String,
    default: null
  },
  admin: {
    type: Boolean,
    default: false
  },
  ageGroup: {
    type: Schema.Types.String,
    default: null
  },
  wardId: {
    type: Schema.Types.ObjectId,
    default: true
  },
  organizationId: {
    type: Schema.Types.ObjectId,
    default: true
  },
});

const Member = model<Member>('Member', memberSchema);

export = Member
