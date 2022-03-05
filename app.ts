import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import userRouter from './router/user.router'
const app = express();


mongoose.connect(String(process.env.DBURL))
  .then(() => console.log(`App is connected to database`))
  .catch(() => console.log('can\'t connect to db'))
mongoose.set('debug', true);
app.use(express.json())

app.use('/user', userRouter)





app.use((err, req, res, next) => {

  res.status(500).send(err)
})

app.listen(process.env.PORT, () => {
  console.log('App is connected on port ' + process.env.PORT);

})
