/* eslint-disable react/prop-types */
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import '../Vehicles.css'

const Vehicles = observer(({ VehicleStore }) => {
  console.log(toJS(VehicleStore.makers), 'nebitan konzol')
  return (
    <div className='vehicles'>
    </div>
  )
})

export default Vehicles
