import { Schema, model, ObjectId } from 'mongoose';

interface Calling {
  callingId: ObjectId
  organizationId: ObjectId
  name: string
}

const callingSchema = new Schema<Calling>({
  callingId: {
    type: Schema.Types.ObjectId,
  },
  organizationId: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },

});

const Calling = model<Calling>('Calling', callingSchema);

export = Calling
