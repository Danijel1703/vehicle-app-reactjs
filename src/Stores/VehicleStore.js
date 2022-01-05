import { makeObservable, action, observable, autorun, runInAction } from 'mobx'
import API from '../Common/API'

class Vehicles {
  constructor () {
    this.models = null
    this.makers = null
    this.sortedByMaker = []
    makeObservable(this, {
      models: observable,
      makers: observable,
      sortedByMaker: observable,
      fetchVehicles: action,
      fetchMakers: action
    })
    autorun(() => {
      this.fetchMakers()
      this.fetchVehicles()
    })
  }

  async fetchMakers () {
    const makers = await API.getAllMakers()
    runInAction(() => {
      this.makers = makers
    })
  }

  async fetchVehicles () {
    const models = await API.getAllVehicles()
    runInAction(() => {
      this.models = models
      this.sortByMaker()
    })
  }

  sortByMaker () {
    const sorted = []
    this.makers?.forEach((maker) => {
      const models = []
      this.models?.forEach((model) => {
        if (model.makeId === maker.id) {
          models.push(model)
        }
      })
      sorted.push({ maker, models })
    })
    this.sortedByMaker = sorted
  }
}

const VehicleStore = new Vehicles()

export default VehicleStore
