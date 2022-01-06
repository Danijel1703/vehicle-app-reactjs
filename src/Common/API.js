// backend koji koristi axios library za slanje CRUD requestova
// svi requestvoi su napravljeni da se mogu pozvati ko obične funkcije u drugim komponentama

const axios = require('axios').default
const baseUrl = 'https://api.baasic.com/beta/vehicle-app-reactjs'

module.exports.getAllMakers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleMake/`)
    return response.data.item
  } catch (error) {
    console.error(error)
  }
}

module.exports.getAllVehicles = async () => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleModel/`)
    return response.data.item
  } catch (error) {
    console.error(error)
  }
}

module.exports.getMakerVehicles = async (id, page = 2) => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleModel?searchQuery=WHERE makeId='${id}'&page=${page}&rpp=10`)
    return response.data.item
  } catch (error) {
    console.error(error)
  }
}

module.exports.getNumberOfPages = async () => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleModel/`)
    const totalRecords = response.data.totalRecords
    const reminder = totalRecords % 10 // %10 je tu zato sto imamo 10 vozila po stranici
    let numberOfPages = 0
    if (reminder > 0) {
      numberOfPages = Math.floor(totalRecords / 10) + 1
    }
    return numberOfPages
  } catch (error) {
    console.error(error)
  }
}
