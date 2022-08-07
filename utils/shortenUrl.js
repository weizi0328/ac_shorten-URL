// const random = (length = 5) => {
//   let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

//   let str = ''
//   for (let i = 0; i < length; i++) {
//     str += chars.charAt(Math.floor(Math.random() * chars.length))
//   }
//   return str
// }

const BASE_62_CHAR = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
const MAX = 61
const MIN = 0

module.exports = (shortenUrl_Length) => {
  let result = ''

  for (i = 0; i < shortenUrl_Length; i++) {
    const randomIndex = Math.floor(Math.random() * (MAX - MIN + 1) + MIN)
    const chooseChar = BASE_62_CHAR[randomIndex]
    result += chooseChar
  }
  return result
}