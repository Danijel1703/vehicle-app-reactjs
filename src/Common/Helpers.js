class CreateHelpers {
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
