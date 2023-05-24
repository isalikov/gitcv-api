import * as dotenv from 'dotenv'

const getPath = (): string => {
    if (process.env.NODE_ENV !== 'production') {
        return '.env.local'
    }

    return '.env'
}

dotenv.config({ path: getPath() })
