import { action, makeObservable, observable, runInAction } from 'mobx'
import VehicleMakeService from '../Common/VehicleMakeService'

class FilterStore {
  constructor () {
    this.allMakers = null
    this.whitelist = []
    makeObservable(this, {
      allMakers: observable,
      whitelist: observable,
      setAllMakers: action,
      setWhitelist: action
    })
  }

  async setAllMakers () {
    const numberOfMakers = await VehicleMakeService.getNumberOfMakers()
    const allMakers = await VehicleMakeService.getAllMakers(numberOfMakers)
    runInAction(() => {
      this.allMakers = allMakers
    })
  }

  setWhitelist (event, makeId) {
    const checked = event.target.checked
    if (checked) {
      this.whitelist.push(makeId)
    } else {
      const filteredWhitelist = this.whitelist.filter(id => id !== makeId)
      this.whitelist = filteredWhitelist
    }
  }
}

const Store = new FilterStore()
export default Store
