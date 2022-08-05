function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}


function generateUrl() {
  const items = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

  // dummy data of req.body

  // create a collection to store things user picked up
  let collection = items.split('')

  // remove things user do not need
  // 這邊沒有

  // start generating URL
  let url = ''
  for (let i = 0; i < 5; i++) {
    url += sample(collection)
  }

  // return the generated URL
  return url
}

generateUrl()