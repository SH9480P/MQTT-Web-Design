import express from 'express'
import { createProblem, getProblems } from '../services/problem.js'

export const problemRouter = express.Router()

problemRouter.get('/', async (req, res) => {
    res.json(await getProblems())
})

problemRouter.post('/', async (req, res) => {
    await createProblem()
    res.sendStatus(201)
})