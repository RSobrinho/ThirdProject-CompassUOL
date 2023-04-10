# Third and Last Project for Compass UOL - Internship Program 😎

## About
This project is basically a car rental, where exists users, cars and reserves. Basically, a logged user can rent a car, creating a new reserve. The API leads with CRUDs, validation and managing of the parts.

## Status -> In development 😃
### 0% [=======>XX] 100%

## Tecnologies used/to be used (possibly 😐)
- [X] Javascript
- [X] Node.js + Express
- [X] Typescript
- [X] Eslint
- [X] Testing - Vitest
- [ ] Swagger (I cant finish in time)
- [X] MongoDB

## To Be Done/Requirements
- [X] Readability
- [X] Private repository
- [X] Small commits
- [X] Commit pattern
- [X] Express
- [X] Readme
- [X] Explanation of how to run locally
- [X] Deploy the application
- [X] Share the (repository link) with Compass Team by E-Mail
- [X] **Implement Get Routes**
- [X] **Implement Post Routes**
- [X] **Implement Delete Routes**
- [X] **Implement Patch/Update Routes**


## How to reply this project

### Install LTS node version on website: https://nodejs.org/en/download/

### Setting database enviroment
- #### (Atlas + MongoDB - Online enviroment)
1. LogIn or SignUp on https://www.mongodb.com/atlas
2. Create a new project as cluster
3. Connect to the cluster -> `Connect your application`
4. Copy the connection string
5. Rename `.env.example` file just to `.env`
6. Change `<Password>` field (on the connection string) to your cluster password created on atlas

### To install necessary dependencies: ```npm install```
- After all the configuration, to build the application, write on terminal: ```npm run build```
- And to start the application after building Typescript to Javascript, run: ```npm run start```
- If you want just to run the application locally without creating the dist folder (with builded Javascript), just run on terminal: ```npm run dev```

### URL to hosted API on AWS Elastic Beanstalk: http://thirdproject-compassuol-env.eba-5nejuyrp.sa-east-1.elasticbeanstalk.com/

### Acknowledgments
I just wanted to give a big thanks to CompassUOL for giving me the opportunity to complete my internship as a backend developer with their amazing team!

During my time with CompassUOL and my colleagues, I had the chance to work on some really exciting projects, learn new skills, and gain valuable insights into the industry. My supervisor, Leandro, and the instructors were incredibly supportive and provided me with invaluable guidance and feedback, helping me to grow both personally and professionally. I sincerely believe that without the tips from the instructors, it would have taken me much longer to learn and develop certain skills.

I can honestly say that my time at CompassUOL has been (and I hope will continue to be) the experience that has helped me evolve the most as a software engineer. I have learned so much about backend development, coding best practices, and working as part of a team.

Thank you again to CompassUOL and all the people involved for this amazing opportunity, and I really hope that I can continue to work with you as a backend developer in the future 😁.


# API Documentation

## SignUp/Create user

```http
  POST /api/v1/user/
```

#### Input

```json
{
    "name": "Rafael Sobrinho",
    "cpf": "077.998.461-78",
    "birth": "03/07/2004",
    "email": "rafarrsobrinho@hotmail.com",
    "password": "Rafael123456!@#",
    "cep": "79102060",
    "qualified": "no"
}
```

| Body              | Tipo     | Descrição     |
| :---------------- | :------- | :------------ |
| `name`            | `string` | **Required**. |
| `cpf`             | `string` | **Required**. |
| `birth`           | `string` | **Required**. |
| `email`           | `string` | **Required**. |
| `password`        | `string` | **Required**. |
| `cep`             | `string` | **Required**. |
| `qualified`       | `string` | **Required**. |

## Get All Users | Get Users by query parameter

```http
  GET /api/v1/user/?param1=x&param2=y
```

| Parâmetros Query  | Tipo     | Descrição     |
| :---------------- | :------- | :------------ |
| `page`            | `string` | **Optional**. |
| `limit`           | `string` | **Optional**. |
| `birth`           | `string` | **Optional**. |
| `name`            | `string` | **Optional**. |
| `cpf`             | `string` | **Optional**. |
| `birth`           | `string` | **Optional**. |
| `email`           | `string` | **Optional**. |
| `password`        | `string` | **Optional**. |
| `cep`             | `string` | **Optional**. |
| `qualified`       | `string` | **Optional**. |
| `patio`           | `string` | **Optional**. |
| `complement`      | `string` | **Optional**. |
| `neighborhood`    | `string` | **Optional**. |
| `locality`        | `string` | **Optional**. |
| `uf`              | `string` | **Optional**. |


## SignIn/LogIn/Authenticate user

```http
  POST /api/v1/user/authenticate
```

#### Input

```json
{
  "email": "rafarrsobrinho@hotmail.com",
  "password": "Rafael123456!@#",
}
```

| Body       | Tipo     | Descrição     |
| :--------- | :------- | :------------ |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

## Update user by id

```http
  PATCH /api/v1/user/:id
```

#### Input

```json
{
    "name": "Rafael Sobrinho",
    "cpf": "077.998.461-78",
    "birth": "03/07/2004",
    "email": "rafarrsobrinho@hotmail.com",
    "password": "Rafael123456!@#",
    "cep": "79102060",
    "qualified": "no",
    "patio": "Rua guanabara",
    "complement": "Muro Azul",
    "locality": "Jardim Ima",
    "uf": "MS"
}
```

| Parâmetro         | Tipo     | Descrição     |
| :---------------- | :------- | :------------ |
| `id`              | `string` | **Required**. |

| Body              | Tipo     | Descrição     |
| :---------------- | :------- | :------------ |
| `name`            | `string` | **Optional**. |
| `cpf`             | `string` | **Optional**. |
| `birth`           | `string` | **Optional**. |
| `email`           | `string` | **Optional**. |
| `password`        | `string` | **Optional**. |
| `cep`             | `string` | **Optional**. |
| `qualified`       | `string` | **Optional**. |
| `patio`           | `string` | **Optional**. |
| `complement`      | `string` | **Optional**. |
| `neighborhood`    | `string` | **Optional**. |
| `locality`        | `string` | **Optional**. |
| `uf`              | `string` | **Optional**. |

## get user by id

```http
  GET /api/v1/user/:id
```

| Parâmetro         | Tipo     | Descrição     |
| :---------------- | :------- | :------------ |
| `id`              | `string` | **Required**. |

## Delete user by id

```http
  DELETE /api/v1/user/:id
```

| Parâmetro         | Tipo     | Descrição     |
| :---------------- | :------- | :------------ |
| `id`              | `string` | **Required**. |


## Create new car

```http
  POST /api/v1/car/
```

#### Input

```json
{
    "model":"BMW",
    "color":"white",
    "year":1990,
    "value_per_day":2802,
    "accessories":[
        {
            "description":"hic culpa illo"
        },
        {
            "description":"iure optio nihil"
        }
    ],
    "number_of_passengers":4
}
```

| Body                   | Tipo            | Descrição     |
| :-------------------   | :-------------- | :------------ |
| `model`                | `string`        | **Required**. |
| `color`                | `string`        | **Required**. |
| `year`                 | `number`        | **Required**. |
| `value_per_day`        | `number`        | **Required**. |
| `accessories`          | `array[object]` | **Required**. |
| `description`          | `string`        | **Required**. |
| `number_of_passengers` | `string`        | **Required**. |

## Get All Cars | Get Cars by query parameter

```http
  GET /api/v1/car/?param1=x&param2=y
```

| Parâmetro Query        | Tipo            | Descrição     |
| :--------------------- | :-------------- | :------------ |
| `page`                 | `string`        | **Optional**. |
| `limit`                | `string`        | **Optional**. |
| `model`                | `string`        | **Optional**. |
| `color`                | `string`        | **Optional**. |
| `year`                 | `number`        | **Optional**. |
| `value_per_day`        | `number`        | **Optional**. |
| `accessories`          | `array[object]` | **Optional**. |
| `description`          | `string`        | **Optional**. |
| `number_of_passengers` | `string`        | **Optional**. |

## Update Accessory car By id

```http
  PATCH /api/v1/car/:id/accessory/:id
```

#### Input

```json
{
    "description": "descricao nova"
}
```

| Parâmetro              | Tipo            | Descrição     |
| :--------------------- | :-------------- | :------------ |
| `id (car)`             | `string`        | **Required**. |
| `id (accessory)`       | `string`        | **Required**. |

## Update car by id

```http
  PATCH /api/v1/car/:id
```

#### Input

```json
{
    "model":"BMW",
    "color":"white",
    "year":1990,
    "value_per_day":2802,
    "accessories":[
        {
            "description":"hic culpa illo"
        },
        {
            "description":"iure optio nihil"
        }
    ],
    "number_of_passengers":4
}
```

| Parâmetro              | Tipo            | Descrição     |
| :--------------------- | :-------------- | :------------ |
| `id`                   | `string`        | **Required**. |

| Body                   | Tipo            | Descrição     |
| :--------------------- | :-------------- | :------------ |
| `model`                | `string`        | **Optional**. |
| `color`                | `string`        | **Optional**. |
| `year`                 | `number`        | **Optional**. |
| `value_per_day`        | `number`        | **Optional**. |
| `accessories`          | `array[object]` | **Optional**. |
| `description`          | `string`        | **Optional**. |
| `number_of_passengers` | `string`        | **Optional**. |

## get car by id

```http
  GET /api/v1/car/:id
```

| Parâmetro              | Tipo            | Descrição     |
| :--------------------- | :-------------- | :------------ |
| `id`                   | `string`        | **Required**. |

## Delete car by id

```http
  DELETE /api/v1/car/:id
```

| Parâmetro              | Tipo            | Descrição     |
| :--------------------- | :-------------- | :------------ |
| `id`                   | `string`        | **Required**. |


## Create new reserve

```http
  POST /api/v1/reserve/
```

#### Input

```json
{
    "start_date": "10/11/2023",
    "end_date": "20/11/2023",
    "_id_car": "e7c44951-b512-4ff4-8847-e0d8e58c4e58"
}
```

| Body                   | Tipo            | Descrição     |
| :-------------------   | :-------------- | :------------ |
| `start_date`           | `string`        | **Required**. |
| `end_date`             | `string`        | **Required**. |
| `_id_car`              | `string`        | **Required**. |

## Get All Reserves | Get Reserves by query parameter

```http
  GET /api/v1/reserve/?param1=x&param2=y
```

| Parâmetro Query        | Tipo            | Descrição     |
| :--------------------- | :-------------- | :------------ |
| `page`                 | `string`        | **Optional**. |
| `limit`                | `string`        | **Optional**. |
| `start_date`           | `string`        | **Optional**. |
| `end_date`             | `string`        | **Optional**. |
| `_id`                  | `string`        | **Optional**. |
| `_id_user`             | `string`        | **Optional**. |
| `_id_car`              | `string`        | **Optional**. |
| `final_value`          | `string`        | **Optional**. |


## Update reserve by id

```http
  PATCH /api/v1/reserve/:id
```

#### Input

```json
{
    "start_date": "10/11/2023",
    "end_date": "20/11/2023",
    "_id_car": "e7c44951-b512-4ff4-8847-e0d8e58c4e58",
    "_id_user": "45644951-b512-4ff4-8847-e0d8e58c4123",
    "final_value": 10000
}
```

| Parâmetro              | Tipo            | Descrição     |
| :--------------------- | :-------------- | :------------ |
| `id`                   | `string`        | **Required**. |

| Body                   | Tipo            | Descrição     |
| :--------------------- | :-------------- | :------------ |
| `start_date`           | `string`        | **Optional**. |
| `end_date`             | `string`        | **Optional**. |
| `_id_user`             | `string`        | **Optional**. |
| `_id_car`              | `string`        | **Optional**. |
| `final_value`          | `number`        | **Optional**. |

## get reserve by id

```http
  GET /api/v1/reserve/:id
```

| Parâmetro              | Tipo            | Descrição     |
| :--------------------- | :-------------- | :------------ |
| `id`                   | `string`        | **Required**. |

## Delete reserve by id

```http
  DELETE /api/v1/reserve/:id
```

| Parâmetro              | Tipo            | Descrição     |
| :--------------------- | :-------------- | :------------ |
| `id`                   | `string`        | **Required**. |


