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

module.exports.getMakerVehicles = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleModel?searchQuery=WHERE makeId='${id}'`)
    return response.data.item
  } catch (error) {
    console.error(error)
  }
}
