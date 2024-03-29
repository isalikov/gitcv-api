import random from 'random-words'
import { v4 as uuidV4 } from 'uuid'

import { UniqueArray } from './types'

export const getTag = (p: string): string => `${p}-${random({ join: '-', exactly: 3 })}`

export const unixTimestamp = (): number => Math.floor(Date.now() / 1000)

export const omit = <T extends Record<string, unknown>, K extends string | number | symbol = keyof T>(
    obj: T,
    key: K,
): Omit<T, K> => {
    return Object.keys(obj).reduce((result, k) => {
        if (k === key) {
            return result
        }

        return {
            ...result,
            [k]: obj[k],
        }
    }, {} as Omit<T, K>)
}

export const getUniqueItems = <T extends Record<string, unknown>>(array?: T[]): UniqueArray<T> | undefined =>
    array?.map((item) => ({
        ...item,
        uuid: uuidV4(),
    }))
