import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { problemRouter } from './src/routes/problem.js'

async function main() {
    dotenv.config()

    const app = express()
    app.use('/problems', problemRouter)
    const port = 3000
    
    await mongoose.connect(process.env.MONGODB_URL)
    app.listen(port, () => {
        console.log(`Example app listening on http://localhost:${port}`)
    })
}

main()
