// backend koji koristi axios library za slanje CRUD requestova
// svi requestvoi su napravljeni da se mogu pozvati ko obične funkcije u drugim komponentama

const axios = require('axios').default
const baseUrl = 'https://api.baasic.com/beta/vehicle-app-reactjs'

module.exports.getAllVehicles = async (numberOfPages = [1]) => {
  try {
    const allModels = []
    numberOfPages?.map(async (pageNumber) => {
      const response = await axios.get(`${baseUrl}/resources/VehicleModel?page=${pageNumber}&rpp=10`)
      response.data.item.map((model) => {
        return allModels.push(model)
      })
    })
    console.log(allModels)
    return allModels
  } catch (error) {
    console.error(error)
  }
}

module.exports.getAllMakers = async (numberOfPages = [1]) => {
  try {
    const allMakers = []
    numberOfPages?.map(async (pageNumber) => {
      const response = await axios.get(`${baseUrl}/resources/VehicleMake?page=${pageNumber}&rpp=10`)
      response.data.item.map((maker) => {
        return allMakers.push(maker)
      })
    })
    return allMakers
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
    console.log(JSON.stringify(body))
    const response = await axios.post(`${baseUrl}/resources/VehicleModel/`, body)
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}
