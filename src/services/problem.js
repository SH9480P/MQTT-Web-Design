import { Problem } from '../schemas/problem.js'

export async function getProblems() {
    const problems = await Problem.find({})
    return problems
}

export async function createProblem() {
    const problem = new Problem({
        randomValue: 1
    })
    return await problem.save()
}
