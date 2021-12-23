import {randomBytes, scrypt} from 'crypto'
import {promisify} from 'util'

const scryptAsync = promisify(scrypt)

export class PasswordService {
    static async hash(password: string) {
        const salt = randomBytes(8).toString('hex'),
            buf = await scryptAsync(password, salt, 64) as Buffer

        return `${buf.toString('hex')}.${salt}`
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.'),
            buf = await scryptAsync(suppliedPassword, salt, 64) as Buffer

        return buf.toString('hex') === hashedPassword
    }
}