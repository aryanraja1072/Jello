//create server and listen on port 5000
import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';
import cors from 'cors';
// import 'express-async-errors';

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Welcome!')
})
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000


const start = async () => {
    try {
        console.log('Connecting to Mongodb...')
        await connectDB(process.env.MONGODB_URI)
        console.log('Connected to Mongodb...')
        app.listen(port, () => console.log(`Server is listening on port ${port}...`))

    } catch (err) {
        console.log(err)
    }
}

start()