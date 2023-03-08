import { getRandomValues } from 'crypto'

const a = getRandomValues(new Uint16Array(1))

console.log(a[0])
