import { observer } from 'mobx-react'
import { useEffect, useState } from 'react/cjs/react.development'

const AddNewVehicles = observer(({ VehicleStore }) => {
  const [makerId, setMakerId] = useState('')
  const [model, setModel] = useState('')
  const [abrv, setAbrv] = useState('')
  const [makers, setMakers] = useState([])
  useEffect(async () => {
    await VehicleStore.fetchAllMakers()
  }, [])
  console.log(makers)
  return (
    <div>
      model
      <input type='text' onInput={e => setModel(e.target.value)}/>
      abrv
      <input type='text' onInput={e => setAbrv(e.target.value)}/>
      <button onClick={() => {
        setMakers(VehicleStore.allMakers)
      }}>
        Select maker
      </button>
      {
        makers?.map((maker) => {
          return (
            <div key={maker.id}
            >
              <button
                onClick={() => {
                  setMakerId(maker.id)
                }}>
                {maker.name}
              </button>
            </div>
          )
        })
      }
      <button onClick={() => {
        VehicleStore.addNewModel({ makerId, model, abrv })
        console.log(makerId, abrv, model)
      }}>
        Add new
      </button>
    </div>
  )
})

export default AddNewVehicles
