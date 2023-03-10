import { connect } from 'mqtt'
import { Problem } from '../schemas/problem.js'
import { connectOptions } from './options/connectOptions.js'
import { topicOptions } from './options/topicOptions.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

let client = connect(connectOptions)

client.on('connect', async (connack) => {
    console.log('subscriber client connected', connack)
    client.subscribe(topicOptions.random, { qos: 1 }, (err, granted) => {
        if (err) {
            console.log(err, 'err')
        }
        console.log(granted, 'granted')
    })
    dotenv.config()
    await mongoose.connect(process.env.MONGODB_URL)
})

client.on('message', async (topic, message, packet) => {
    console.log(packet, message.toString())
    const payload = JSON.parse(message)
    const problem = new Problem({ randomValue: payload.randomValue })
    await problem.save()
    console.log('packet saved successfully')
})

client.on('error', (err) => {
    console.log('Error: ' + err)
    if (err.code == 'ENOTFOUND') {
        console.log(
            'Network error, make sure you have an active internet connection'
        )
    }
})

client.on('close', () => {
    console.log('Connection closed by client')
})

client.on('reconnect', () => {
    console.log('Client trying a reconnection')
})

client.on('offline', () => {
    console.log('Client is currently offline')
})
