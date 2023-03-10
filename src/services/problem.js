import { Problem } from '../schemas/problem.js'

export async function getProblems() {
    const problems = await Problem.find({})
    return problems
}

export async function createProblem() {
    const problem = new Problem({
        randomValue: 1,
    })
    await problem.save()
    return problem
}

export async function deleteProblem() {
    const problem = await Problem.deleteOne({ randomValue: 1 })
    return problem
}
