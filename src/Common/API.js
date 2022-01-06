// backend koji koristi axios library za slanje CRUD requestova
// svi requestvoi su napravljeni da se mogu pozvati ko obične funkcije u drugim komponentama

const axios = require('axios').default
const baseUrl = 'https://api.baasic.com/beta/vehicle-app-reactjs'

module.exports.getAllVehicles = async (numberOfPages = [1]) => {
  try {
    const allModels = []
    numberOfPages?.map(async (pageNumber) => {
      const response = await axios.get(`${baseUrl}/resources/VehicleModel?page=${pageNumber}&rpp=10`)
      allModels.push({ page: pageNumber, models: response.data.item })
    })
    return allModels
  } catch (error) {
    console.error(error)
  }
}

module.exports.getCurrentPageModels = async (currentPage) => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleModel?page=${currentPage}&rpp=10`)
    return response.data.item
  } catch (error) {
    console.error(error)
  }
}

module.exports.getNumberOfMakers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleMake/`)
    return response.data.totalRecords
  } catch (error) {
    console.error(error)
  }
}

module.exports.getNumberOfModels = async () => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleModel/`)
    return response.data.totalRecords
  } catch (error) {
    console.error(error)
  }
}
