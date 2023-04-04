import { Schema, model, Document, Types } from 'mongoose'

interface IReserveSchema extends Document {
  _id: Schema.Types.Mixed,
  id_user: string,
  start_date: string,
  end_date: string,
  id_car: string,
  final_value: number
}

const ReserveSchema = new Schema({
  _id: Schema.Types.Mixed,
  id_user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  start_date: String,
  id_car: {
    type: Types.ObjectId,
    ref: 'Car'
  },
  final_value: Number
})

export default model<IReserveSchema>('Reserve', ReserveSchema)
