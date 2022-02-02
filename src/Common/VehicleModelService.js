/* eslint-disable no-unused-vars */
const axios = require('axios').default
const baseUrl = 'https://api.baasic.com/beta/vehicle-app-reactjs'

class CreateVehicleModelService {
  async getAllModels (numberOfModels, sort) {
    try {
      const response = await axios.get(`${baseUrl}/resources/VehicleModel?rpp=${numberOfModels}&sort=${sort}`)
      return response.data.item
    } catch (error) {
      console.error(error)
    }
  }

  async getCurrentPageModels (currentPage, sort) {
    try {
      const response = await axios.get(`${baseUrl}/resources/VehicleModel?page=${currentPage}&rpp=10&sort=${sort}`)
      return response.data.item
    } catch (error) {
      console.error(error)
    }
  }

  async getFilteredModels (currentPage, sort, maker) {
    const response = await axios.get(`${baseUrl}/resources/VehicleModel?searchQuery=WHERE makeId='${maker}'&page=${currentPage}&rpp=10&sort=${sort}`)
    return response.data.item
  }

  async getNumberOfModels () {
    try {
      const response = await axios.get(`${baseUrl}/resources/VehicleModel/`)
      return response.data.totalRecords
    } catch (error) {
      console.error(error)
    }
  }

  async getModelById (id) {
    try {
      const response = await axios.get(`${baseUrl}/resources/VehicleModel/${id}`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async updateSelectedModel (id, name, abrv) {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.patch(`${baseUrl}/resources/VehicleModel/${id}`, { name, abrv })
    } catch (error) {
      console.error(error)
    }
  }

  async deleteSelectedModel (id) {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.delete(`${baseUrl}/resources/VehicleModel/${id}`)
    } catch (error) {
      console.error(error)
    }
  }

  async addNewModel ({ makerId, model, abrv }) {
    try {
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

  async getSearchInputMaker (input) {
    try {
      const response = await axios.get(`${baseUrl}/resources/VehicleMake?searchQuery=WHERE name='${input}'`)
      return response.data.item[0]
    } catch (error) {
      console.error(error)
    }
  }
}

const VehicleModelService = new CreateVehicleModelService()
export default VehicleModelService
