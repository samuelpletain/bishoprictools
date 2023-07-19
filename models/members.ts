import { Schema, model, ObjectId } from 'mongoose';

interface Member {
  firstName: string
  lastName: string
  email: string
  password: string
  admin: boolean
  ageGroup: string
  wardId: ObjectId
  //stakeId: ObjectId
  organizations: ObjectId[]
}

const memberSchema = new Schema<Member>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: null,
    unique: true
  },
  password: {
    type: String,
    default: null
  },
  admin: {
    type: Boolean,
    default: false
  },
  ageGroup: {
    type: String,
    default: 'Adult',
    enum: ['Adult', 'Youth']
  },
  wardId: {
    type: Schema.Types.ObjectId,
    default: null
  },/*
  stakeId: {
    type: Schema.Types.ObjectId,
    default: null
  },*/
  organizations: [{
    type: Schema.Types.ObjectId,
    default: []
  }]
});

const Member = model<Member>('Member', memberSchema);

export = Member
