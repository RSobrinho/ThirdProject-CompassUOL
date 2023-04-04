import { Schema, model, Document, Types } from 'mongoose'

interface ICarSchema extends Document {
  _id: Schema.Types.Mixed,
  model: string,
  color: string,
  year: number,
  value_per_day: number,
  accessories: [
    {
      description: string
    }
  ],
  number_of_passengers: number
}

const CarSchema = new Schema({
  _id: Schema.Types.Mixed,
  model: String,
  color: String,
  year: Number,
  value_per_day: Number,
  accessories: [
    {
      description: String
    }
  ],
  number_of_passengers: Number
})

export default model<ICarSchema>('Reserve', CarSchema)
