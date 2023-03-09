import { Schema, model } from 'mongoose'

const problemSchema = new Schema(
    {
        randomValue: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
)

export const Problem = model('Problem', problemSchema)
