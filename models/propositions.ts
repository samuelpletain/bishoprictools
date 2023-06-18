import { Schema, model, ObjectId } from 'mongoose';

interface Proposition {
  memberId: ObjectId
  callingId: ObjectId
  leaderApproval: boolean
  contactedOn: Date
  interviewDate: Date
  interviewed: boolean
  accepted: boolean
  sustainedOn: Date
  setApart: Date
  realeasedOn: Date
}

const propositionSchema = new Schema<Proposition>({
  memberId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  callingId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  leaderApproval: {
    type: Boolean,
    default: false
  },
  contactedOn: {
    type: Date,
    default: null
  },
  interviewDate: {
    type: Date,
    default: null
  },
  interviewed: {
    type: Boolean,
    default: false
  },
  accepted: {
    type: Boolean,
    default: false
  },
  sustainedOn: {
    type: Date,
    default: null
  },
  setApart: {
    type: Date,
    default: null
  },
  realeasedOn: {
    type: Date,
    default: null
  }
});

const Proposition = model<Proposition>('Proposition', propositionSchema);

export = Proposition
