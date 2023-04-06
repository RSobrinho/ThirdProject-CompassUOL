import { Schema, model, Document, Types } from 'mongoose'

interface ICarSchema extends Document {
  _id: Schema.Types.Mixed,
  model: string,
  color: string,
  year: number,
  valuePerDay: number,
  accessories: [
    {
      _id: string
      description: string
    }
  ],
  numberOfPassengers: number
}

const CarSchema = new Schema({
  _id: Schema.Types.Mixed,
  model: String,
  color: String,
  year: Number,
  valuePerDay: Number,
  accessories: [
    {
      _id: String,
      description: String
    }
  ],
  numberOfPassengers: Number
})

export default model<ICarSchema>('Car', CarSchema)
