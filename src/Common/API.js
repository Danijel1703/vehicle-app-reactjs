/* eslint-disable no-unused-vars */
// backend koji koristi axios library za slanje CRUD requestova
// svi requestvoi su napravljeni da se mogu pozvati ko obične funkcije u drugim komponentama

const axios = require('axios').default
const baseUrl = 'https://api.baasic.com/beta/vehicle-app-reactjs'

module.exports.getAllVehicles = async (numberOfModels, sort) => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleModel?rpp=${numberOfModels}&sort=${sort}`)
    return response.data.item
  } catch (error) {
    console.error(error)
  }
}

module.exports.getAllMakers = async (numberOfMakers, sort) => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleMake?rpp=${numberOfMakers}&sort=${sort}`)
    return response.data.item
  } catch (error) {
    console.error(error)
  }
}

module.exports.getCurrentPageModels = async (currentPage, sort) => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleModel?page=${currentPage}&rpp=10&sort=${sort}`)
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
    console.log(abrv)
    const body = {
      makeId: makerId,
      name: model,
      abrv
    }
    const response = await axios.post(`${baseUrl}/resources/VehicleModel/`, body)
  } catch (error) {
    console.error(error)
  }
}

module.exports.addNewMaker = async ({ maker, abrv }) => {
  try {
    console.log(maker, abrv)
    const body = {
      name: maker,
      abrv
    }
    const response = await axios.post(`${baseUrl}/resources/VehicleMake/`, body)
  } catch (error) {
    console.error(error)
  }
}

module.exports.getSearchInputModel = async (input) => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleModel?searchQuery=WHERE name='${input}'`)
    return response.data.item[0]
  } catch (error) {
    console.error(error)
  }
}

module.exports.getMakerById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleMake/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

module.exports.updateSelectedMaker = async (id, name) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.patch(`${baseUrl}/resources/VehicleMake/${id}`, { name })
  } catch (error) {
    console.error(error)
  }
}

module.exports.deleteSelectedMaker = async (id) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.delete(`${baseUrl}/resources/VehicleMake/${id}`)
  } catch (error) {
    console.error(error)
  }
}

module.exports.deleteMakerModel = async (id) => {
  try {
    const deleteMakerModel = await axios.delete(`${baseUrl}/resources/VehicleModel/${id}`)
  } catch (error) {
    console.error(error)
  }
}

module.exports.getSearchInputMaker = async (input) => {
  try {
    const response = await axios.get(`${baseUrl}/resources/VehicleMake?searchQuery=WHERE name='${input}'`)
    return response.data.item[0]
  } catch (error) {
    console.error(error)
  }
}
