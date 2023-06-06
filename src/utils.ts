import random from 'random-words'

export const getTag = (p: string): string => `${p}-${random({ join: '-', exactly: 3 })}`

export const unixTimestamp = (): number => Math.floor(Date.now() / 1000)
