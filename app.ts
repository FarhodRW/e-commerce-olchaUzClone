import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import adminRouter from './src/router/admin.router'
import userRouter from './src/router/user.router'
import categoryRouter from './src/router/category.router'
import productRouter from './src/router/product.router'
import reviewRouter from './src/router/review.router'
import orderRouter from './src/router/order.router'
import { uploadRouter } from './src/router/upload.router'
const app = express();


mongoose.connect(String(process.env.DBURL))
  .then(() => console.log(`App is connected to database`))
  .catch(() => console.log('can\'t connect to db'))
mongoose.set('debug', true);
app.use(express.json())

app.use('/admin', adminRouter)
app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/review', reviewRouter)
app.use('/order', orderRouter)

app.use('/upload', uploadRouter)

app.use((err, req, res, next) => {
  res.status(500).send(err)
})

app.listen(process.env.PORT, () => {
  console.log('App is connected on port ' + process.env.PORT);

})
