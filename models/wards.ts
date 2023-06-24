import { Schema, model, ObjectId } from 'mongoose';

interface Ward {
  wardId: ObjectId
  name: string
}

const wardSchema = new Schema<Ward>({
  wardId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },

});

const Ward = model<Ward>('Ward', wardSchema);

export = Ward
