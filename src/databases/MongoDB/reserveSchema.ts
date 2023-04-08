import { Schema, model, Document, Types } from 'mongoose'

interface IReserveSchema extends Document {
  _id: Schema.Types.Mixed,
  idUser: Schema.Types.Mixed,
  startDate: Date,
  endDate: Date,
  idCar: Schema.Types.Mixed,
  finalValue: number
}

const ReserveSchema = new Schema({
  _id: Schema.Types.Mixed,
  idUser: {
    type: Schema.Types.Mixed,
    ref: 'User'
  },
  startDate: Date,
  endDate: Date,
  idCar: {
    type: Schema.Types.Mixed,
    ref: 'Car'
  },
  finalValue: Number
})

export default model<IReserveSchema>('Reserve', ReserveSchema)
