const axios = require('axios').default
const baseUrl = 'https://api.baasic.com/beta/vehicle-app-reactjs'

module.exports.getAllMakers = async () => {
  const response = await axios.get(`${baseUrl}/resources/VehicleMake/`)
  return response.data.item
}
