// backend koji koristi axios library za slanje CRUD requestova
// svi requestvoi su napravljeni da se mogu pozvati ko obične funkcije u drugim komponentama

const axios = require('axios').default
const baseUrl = 'https://api.baasic.com/beta/vehicle-app-reactjs'

module.exports.getAllVehicles = async (numberOfModels) => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleModel?rpp=${numberOfModels}`)
    return response.data.item
  } catch (error) {
    console.error(error)
  }
}

module.exports.getAllMakers = async (numberOfMakers) => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleMake?rpp=${numberOfMakers}`)
    return response.data.item
  } catch (error) {
    console.error(error)
  }
}

module.exports.getCurrentPageModels = async (currentPage) => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleModel?page=${currentPage}&rpp=10`)
    console.log(response.data.item)
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

module.exports.getModelById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleModel/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

module.exports.updateSelectedModel = async (id, name) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.patch(`${baseUrl}/resources/VehicleModel/${id}`, { name })
  } catch (error) {
    console.error(error)
  }
}

module.exports.deleteSelectedModel = async (id) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.delete(`${baseUrl}/resources/VehicleModel/${id}`)
  } catch (error) {
    console.error(error)
  }
}

module.exports.addNewModel = async ({ makerId, model, abrv }) => {
  try {
    console.log(makerId, model, abrv)
    const body = {
      makeId: makerId,
      name: model,
      abrv
    }
    const response = await axios.post(`${baseUrl}/resources/VehicleModel/`, body)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}
