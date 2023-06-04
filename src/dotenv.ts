const getPath = (): string => {
    if (process.env.NODE_ENV !== 'production') {
        return '.env.local'
    }

    return '.env'
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: getPath() })
