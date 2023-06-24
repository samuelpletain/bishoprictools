import { Schema, model } from 'mongoose';

interface Ward {
  name: string
}

const wardSchema = new Schema<Ward>({
  name: {
    type: String,
    required: true
  }
});

const Ward = model<Ward>('Ward', wardSchema);

export = Ward
