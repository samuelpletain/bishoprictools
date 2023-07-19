import { Schema, model } from 'mongoose';

interface Stake {
  name: string
}

const stakeSchema = new Schema<Stake>({
  name: {
    type: String,
    required: true
  }
});

const Stake = model<Stake>('Stake', stakeSchema);

export = Stake
