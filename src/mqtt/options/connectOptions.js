import dotenv from 'dotenv'

dotenv.config()

export const connectOptions = {
    host: process.env.MQTT_BROKER_HOST,
    port: process.env.MQTT_BROKER_PORT,
    protocol: 'mqtt',
    protocolVersion: 5
}