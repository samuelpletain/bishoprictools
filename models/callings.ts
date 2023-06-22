import { Schema, model, ObjectId } from 'mongoose';

interface Calling {
  organizationId: ObjectId
  name: string
}

const callingSchema = new Schema<Calling>({
  organizationId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },

});

const Calling = model<Calling>('Calling', callingSchema);

export = Calling
