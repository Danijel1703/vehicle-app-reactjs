/* eslint-disable react/prop-types */
// import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import '../Vehicles.css'

const Vehicles = observer(({ VehicleStore }) => {
  console.log(VehicleStore.sortedByMaker)
  return (
    <div className='vehicles'>
    </div>
  )
})

export default Vehicles
