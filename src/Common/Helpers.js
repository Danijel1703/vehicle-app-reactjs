class CreateHelpers {
  getNumberOfPages (count) {
    if (Number.isInteger(count / 10)) {
      return count / 10
    } else {
      return Math.floor(count / 10) + 1
    }
  }

  toArray (number) {
    const newArray = []
    for (let i = 1; i <= number; i++) {
      newArray.push(i)
    }
    return newArray
  }
}

const Helpers = new CreateHelpers()
export default Helpers
