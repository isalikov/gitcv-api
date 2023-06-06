import randomWords from 'random-words'

export const getTag = (p: string): string => `${p}-${randomWords({ join: '-', exactly: 3 })}`

console.log(getTag('123'))

export const unixTimestamp = (): number => Math.floor(Date.now() / 1000)
