import { connect } from 'mqtt'
import { connectOptions } from './options/connectOptions.js'

let client = connect(connectOptions)
const topic = 'test/connection'

client.on('connect', (connack) => {
    console.log('subscriber client connected', connack)
    client.subscribe(topic, { qos: 1 }, (err, granted) => {
        if (err) {
            console.log(err, 'err')
        }
        console.log(granted, 'granted')
    })
})

client.on('message', (topic, message, packet) => {
    console.log(packet, message.toString())
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
