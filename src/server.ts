import app from './app'

const port = process.env.PORT ? Number(process.env.PORT) : 8080
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
