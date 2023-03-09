import { connect } from 'mqtt'
import { connectOptions } from './options/connectOptions.js'
import { topicOptions } from './options/topicOptions.js'
import { getRandomValues } from 'crypto'

const client = connect(connectOptions)

client.on('connect', (connack) => {
    console.log('publisher client connected', connack)
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

setInterval(() => {
    const payload = {
        randomValue: getRandomValues(new Uint16Array(2))[0].toString(),
    }
    const publishOption = {
        qos: 1,
        retain: false,
        properties: {
            userProperties: {
                user: 'property',
            },
        },
    }
    client.publish(
        topicOptions.random,
        JSON.stringify(payload),
        publishOption,
        (err, packet) => {
            if (packet) {
                console.log(packet, 'MQTT publish packet')
            }
        }
    )
}, 5000)
