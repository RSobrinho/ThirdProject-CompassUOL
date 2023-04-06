import { CarEntity } from 'entities/implementations/car'
import { ICarEntityProps } from 'entities/interfaces/iCarEntityProps'

export const cars: any[] = [
  { model: 'Maserati 1', color: 'pink', year: 1993, valuePerDay: 1335, accessories: [{ description: 'alias illo', _id: '0c26befa-03a4-4eaa-9dd6-0a1174ca1cf6' }, { description: 'quam accusamus', _id: '5cf16fa8-49b4-4672-a07f-7e1192220b48' }, { description: 'quos harum', _id: '99bdbdd0-35b4-46e0-ae0e-6b86493e05ce' }], numberOfPassengers: 4, _id: 'd88eb621-c5c2-43f8-bec1-f6d56ed38cbd' },

  { model: 'Fiat XC90', color: 'lavender', year: 1986, valuePerDay: 1276, accessories: [{ description: 'hic molestias', _id: 'ad6cefbc-a759-4680-861d-cc27ed9931d2' }, { description: 'quisquam occaecati', _id: 'dcaaef39-7fdd-4dcc-a304-d6aadba3ce8e' }, { description: 'debitis laudantium', _id: '9ab639e4-fc90-4610-af27-f68df3776ec4' }], numberOfPassengers: 6, _id: '9e90575e-f733-44e8-93af-8c208405a330' },

  { model: 'Volkswagen Malibu', color: 'mint green', year: 2005, valuePerDay: 9597, accessories: [{ description: 'necessitatibus quasi', _id: '6a785cf1-cdf5-4485-9eb6-c068a606e411' }, { description: 'enim quidem', _id: '8c39dbd7-bb44-4d44-89fc-90edd4580588' }, { description: 'consequuntur quia', _id: 'd2a87df9-0612-4dc4-8aa6-cb2f6a8fb122' }], numberOfPassengers: 10, _id: 'e758c3d6-dcc3-486b-9e0e-133b4d80ba60' },

  { model: 'Cadillac Mercielago', color: 'green', year: 2008, valuePerDay: 3432, accessories: [{ description: 'odio architecto', _id: '0b7b35e2-238c-4878-8b64-d4cefa7b8a58' }, { description: 'saepe quaerat', _id: '2deabfa1-6bad-4cce-a0f5-34d495fd7305' }, { description: 'eligendi ab', _id: '56aedcc2-230f-45ee-bed8-f1339f1a1a5a' }], numberOfPassengers: 6, _id: 'ec27601d-45d4-48d1-8458-2d6dc088aec5' },

  { model: 'Porsche Spyder', color: 'black', year: 1975, valuePerDay: 6976, accessories: [{ description: 'ad atque', _id: 'f82d79e5-fa01-4db8-b8fc-24339b733215' }, { description: 'repellendus eius', _id: 'd4981559-6bae-4632-b11c-261176aaa409' }, { description: 'autem animi', _id: 'f6298b5d-e2df-4f0a-bdbb-dde92e704e35' }], numberOfPassengers: 8, _id: '59d5f503-fc53-4d4c-ac4f-43543e399e17' },

  { model: 'Porsche Spyder', color: 'white', year: 1975, valuePerDay: 6975, accessories: [{ description: 'ad atque', _id: 'f82d79e5-fa01-4db8-b8fc-24339b733215' }, { description: 'repellendus eius', _id: 'd4981559-6bae-4632-b11c-261176aaa409' }, { description: 'autem animi', _id: 'f6298b5d-e2df-4f0a-bdbb-dde92e704e35' }], numberOfPassengers: 4, _id: '59d5f503-fc53-4d4c-ac4f-43543e399e17' },

  { model: 'Porsche Spyder', color: 'yellow', year: 1975, valuePerDay: 6974, accessories: [{ description: 'ad atque', _id: 'f82d79e5-fa01-4db8-b8fc-24339b733215' }, { description: 'repellendus eius', _id: 'd4981559-6bae-4632-b11c-261176aaa409' }, { description: 'autem animi', _id: 'f6298b5d-e2df-4f0a-bdbb-dde92e704e35' }], numberOfPassengers: 2, _id: '59d5f503-fc53-4d4c-ac4f-43543e399e17' },

  { model: 'Porsche Spyder', color: 'yellow', year: 1975, valuePerDay: 6975, accessories: [{ description: 'ad atque', _id: 'f82d79e5-fa01-4db8-b8fc-24339b733215' }, { description: 'repellendus eius', _id: 'd4981559-6bae-4632-b11c-261176aaa409' }, { description: 'autem animi', _id: 'f6298b5d-e2df-4f0a-bdbb-dde92e704e35' }], numberOfPassengers: 2, _id: '59d5f503-fc53-4d4c-ac4f-43543e399e17' },

  { model: 'Maserati 1', color: 'pink', year: 1993, valuePerDay: 1335, accessories: [{ description: 'alias illo', _id: '0c26befa-03a4-4eaa-9dd6-0a1174ca1cf6' }, { description: 'quam accusamus', _id: '5cf16fa8-49b4-4672-a07f-7e1192220b48' }, { description: 'quos harum', _id: '99bdbdd0-35b4-46e0-ae0e-6b86493e05ce' }], numberOfPassengers: 4, _id: 'd88eb621-c5c2-43f8-bec1-f6d56ed38cbd' },

  { model: 'Fiat XC90', color: 'lavender', year: 1986, valuePerDay: 1276, accessories: [{ description: 'hic molestias', _id: 'ad6cefbc-a759-4680-861d-cc27ed9931d2' }, { description: 'quisquam occaecati', _id: 'dcaaef39-7fdd-4dcc-a304-d6aadba3ce8e' }, { description: 'debitis laudantium', _id: '9ab639e4-fc90-4610-af27-f68df3776ec4' }], numberOfPassengers: 6, _id: '9e90575e-f733-44e8-93af-8c208405a330' },

  { model: 'Volkswagen Malibu', color: 'mint green', year: 2005, valuePerDay: 9597, accessories: [{ description: 'necessitatibus quasi', _id: '6a785cf1-cdf5-4485-9eb6-c068a606e411' }, { description: 'enim quidem', _id: '8c39dbd7-bb44-4d44-89fc-90edd4580588' }, { description: 'consequuntur quia', _id: 'd2a87df9-0612-4dc4-8aa6-cb2f6a8fb122' }], numberOfPassengers: 10, _id: 'e758c3d6-dcc3-486b-9e0e-133b4d80ba60' },

  { model: 'Cadillac Mercielago', color: 'green', year: 2008, valuePerDay: 3432, accessories: [{ description: 'odio architecto', _id: '0b7b35e2-238c-4878-8b64-d4cefa7b8a58' }, { description: 'saepe quaerat', _id: '2deabfa1-6bad-4cce-a0f5-34d495fd7305' }, { description: 'eligendi ab', _id: '56aedcc2-230f-45ee-bed8-f1339f1a1a5a' }], numberOfPassengers: 6, _id: 'ec27601d-45d4-48d1-8458-2d6dc088aec5' },

  { model: 'Porsche Spyder', color: 'black', year: 1975, valuePerDay: 6976, accessories: [{ description: 'ad atque', _id: 'f82d79e5-fa01-4db8-b8fc-24339b733215' }, { description: 'repellendus eius', _id: 'd4981559-6bae-4632-b11c-261176aaa409' }, { description: 'autem animi', _id: 'f6298b5d-e2df-4f0a-bdbb-dde92e704e35' }], numberOfPassengers: 8, _id: '59d5f503-fc53-4d4c-ac4f-43543e399e17' },

  { model: 'Porsche Spyder', color: 'white', year: 1975, valuePerDay: 6975, accessories: [{ description: 'ad atque', _id: 'f82d79e5-fa01-4db8-b8fc-24339b733215' }, { description: 'repellendus eius', _id: 'd4981559-6bae-4632-b11c-261176aaa409' }, { description: 'autem animi', _id: 'f6298b5d-e2df-4f0a-bdbb-dde92e704e35' }], numberOfPassengers: 4, _id: '59d5f503-fc53-4d4c-ac4f-43543e399e17' },

  { model: 'Porsche Spyder', color: 'yellow', year: 1975, valuePerDay: 6974, accessories: [{ description: 'ad atque', _id: 'f82d79e5-fa01-4db8-b8fc-24339b733215' }, { description: 'repellendus eius', _id: 'd4981559-6bae-4632-b11c-261176aaa409' }, { description: 'autem animi', _id: 'f6298b5d-e2df-4f0a-bdbb-dde92e704e35' }], numberOfPassengers: 2, _id: '59d5f503-fc53-4d4c-ac4f-43543e399e17' },

  { model: 'Porsche Spyder', color: 'yellow', year: 1975, valuePerDay: 6975, accessories: [{ description: 'ad atque', _id: 'f82d79e5-fa01-4db8-b8fc-24339b733215' }, { description: 'repellendus eius', _id: 'd4981559-6bae-4632-b11c-261176aaa409' }, { description: 'autem animi', _id: 'f6298b5d-e2df-4f0a-bdbb-dde92e704e35' }], numberOfPassengers: 2, _id: '59d5f503-fc53-4d4c-ac4f-43543e399e17' }
]
