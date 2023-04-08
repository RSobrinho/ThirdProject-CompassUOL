import { Schema, model, Document } from 'mongoose'

interface ICarSchema extends Document {
  _id: Schema.Types.Mixed,
  model: string,
  color: string,
  year: number,
  value_per_day: number,
  accessories: [
    {
      _id: string
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
      _id: String,
      description: String
    }
  ],
  number_of_passengers: Number
})

export default model<ICarSchema>('Car', CarSchema)
