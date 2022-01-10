/* eslint-disable no-unused-vars */
// backend koji koristi axios library za slanje CRUD requestova
const axios = require('axios').default
const baseUrl = 'https://api.baasic.com/beta/vehicle-app-reactjs'

class CreateAPI {
  async getAllModels (numberOfModels, sort) {
    try {
      const response = await axios.get(`${baseUrl}/resources/VehicleModel?rpp=${numberOfModels}&sort=${sort}`)
      return response.data.item
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

  async getCurrentPageModels (currentPage, sort) {
    try {
      const response = await axios.get(`${baseUrl}/resources/VehicleModel?page=${currentPage}&rpp=10&sort=${sort}`)
      return response.data.item
    } catch (error) {
      console.error(error)
    }
  }

  async getNumberOfMakers () {
    try {
      const response = await axios.get(`${baseUrl}/resources/VehicleMake/`)
      return response.data.totalRecords
    } catch (error) {
      console.error(error)
    }
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

  async getSearchInputModel (input) {
    try {
      const response = await axios.get(`${baseUrl}/resources/VehicleModel?searchQuery=WHERE name='${input}'`)
      return response.data.item[0]
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
      // eslint-disable-next-line no-unused-vars
      const response = await axios.patch(`${baseUrl}/resources/VehicleMake/${id}`, { name, abrv })
    } catch (error) {
      console.error(error)
    }
  }

  async deleteSelectedMaker (id) {
    try {
      // eslint-disable-next-line no-unused-vars
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

const API = new CreateAPI()
export default API
