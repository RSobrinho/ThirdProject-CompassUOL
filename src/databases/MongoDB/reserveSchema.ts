import { Schema, model, Document } from 'mongoose'

interface IReserveSchema extends Document {
  _id: Schema.Types.Mixed,
  _id_user: Schema.Types.Mixed,
  start_date: Date,
  end_date: Date,
  _id_car: Schema.Types.Mixed,
  final_value: number
}

const ReserveSchema = new Schema({
  _id: Schema.Types.Mixed,
  _id_user: {
    type: Schema.Types.Mixed,
    ref: 'User'
  },
  start_date: Date,
  end_date: Date,
  _id_car: {
    type: Schema.Types.Mixed,
    ref: 'Car'
  },
  final_value: Number
})

export default model<IReserveSchema>('Reserve', ReserveSchema)
