import { Schema, model, Document } from 'mongoose'

interface IUserSchema extends Document {
  _id: Schema.Types.Mixed,
  name: string,
  cpf: string,
  birth: Date,
  email: string,
  password: string,
  cep: string,
  qualified: string,
  patio: string,
  complement: string,
  neighborhood: string,
  locality: string,
  uf: string
}

const UserSchema = new Schema({
  _id: Schema.Types.Mixed,
  name: String,
  cpf: String,
  birth: Date,
  email: String,
  password: String,
  cep: String,
  qualified: String,
  patio: String,
  complement: String,
  neighborhood: String,
  locality: String,
  uf: String
})

export default model<IUserSchema>('User', UserSchema)
