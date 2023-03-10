import express from 'express'
import { createProblem, deleteProblem, getProblems } from '../services/problem.js'

export const problemRouter = express.Router()

problemRouter.get('/', async (req, res) => {
    res.json(await getProblems())
})

problemRouter.post('/', async (req, res) => {
    res.json(await createProblem())
})

problemRouter.delete('/', async (req, res) => {
    res.json(await deleteProblem())
})