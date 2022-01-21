/* eslint-disable no-unused-vars */
const axios = require('axios').default
const baseUrl = 'https://api.baasic.com/beta/vehicle-app-reactjs'

class CreateVehicleMakeService {
  async getNumberOfMakers () {
    try {
      const response = await axios.get(`${baseUrl}/resources/VehicleMake/`)
      return response.data.totalRecords
    } catch (error) {
      console.error(error)
    }
  }

  async getAllMakers (numberOfMakers, sort) {
    try {
      const response = await axios.get(`${baseUrl}/resources/VehicleMake?rpp=${numberOfMakers}&sort=${sort}`)
      return response.data.item
    } catch (error) {
      console.error(error)
    }
  }

  async getCurrentPageMakers (currentPage, sort) {
    try {
      const response = await axios.get(`${baseUrl}/resources/VehicleMakers?page=${currentPage}&rpp=10&sort=${sort}`)
      return response.data.item
    } catch (error) {
      console.error(error)
    }
  }

  async addNewMaker ({ maker, abrv }) {
    try {
      const body = {
        name: maker,
        abrv
      }
      const response = await axios.post(`${baseUrl}/resources/VehicleMake/`, body)
    } catch (error) {
      console.error(error)
    }
  }

  async getMakerById (id) {
    try {
      const response = await axios.get(`${baseUrl}/resources/VehicleMake/${id}`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async updateSelectedMaker (id, name, abrv) {
    try {
      const response = await axios.patch(`${baseUrl}/resources/VehicleMake/${id}`, { name, abrv })
    } catch (error) {
      console.error(error)
    }
  }

  async deleteSelectedMaker (id) {
    try {
      const response = await axios.delete(`${baseUrl}/resources/VehicleMake/${id}`)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteMakerModel (id) {
    try {
      const deleteMakerModel = await axios.delete(`${baseUrl}/resources/VehicleModel/${id}`)
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

const VehicleMakeService = new CreateVehicleMakeService()
export default VehicleMakeService
