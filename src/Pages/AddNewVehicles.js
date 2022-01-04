import { useEffect, useState } from 'react'
import API from '../Common/API'

const AddNewVehicles = () => {
  const [makers, setMakers] = useState([])
  useEffect(async () => {
    console.log('aktivirano')
    setMakers(await API.getAllMakers())
  }, [])
  return (
        <div>
            {
              makers.map((maker) => {
                return <h2 key={maker.id}>{maker.name}</h2>
              })
            }
        </div>
  )
}

export default AddNewVehicles
