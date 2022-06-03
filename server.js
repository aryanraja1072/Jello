//create server and listen on port 5000
import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';
import cors from 'cors';
import morgan from 'morgan';
import auth from './middleware/auth.js';
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

dotenv.config()

const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url))

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', auth, jobsRouter);
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

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