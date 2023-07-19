import { Schema, model, ObjectId } from 'mongoose';

interface Ward {
  name: string;
  stakeId: ObjectId;
}

const wardSchema = new Schema<Ward>({
  name: {
    type: String,
    required: true,
  },
  stakeId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Ward = model<Ward>('Ward', wardSchema);

export = Ward;
