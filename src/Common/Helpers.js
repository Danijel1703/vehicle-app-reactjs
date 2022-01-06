module.exports.getNumberOfPages = (count) => {
  const reminder = count % 10 // %10 je tu zato sto imamo 10 elemenata po stranici
  let pages = 0
  if (reminder > 0) {
    pages = Math.floor(count / 10) + 1
    return pages
  } else {
    return 1
  }
}

module.exports.toArray = (number) => {
  const newArray = []
  for (let i = 1; i <= number; i++) {
    newArray.push(i)
  }
  return newArray
}
