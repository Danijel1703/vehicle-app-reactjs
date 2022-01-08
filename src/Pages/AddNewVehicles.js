import { observer } from 'mobx-react'
import { useEffect, useState } from 'react/cjs/react.development'
import API from '../Common/API'

const AddNewVehicles = observer(({ VehicleStore }) => {
  const [makers, setMakers] = useState([])
  const [selectedMaker, setSelectedMaker] = useState('')
  const [name, setName] = useState('')
  const [abrv, setAbrv] = useState('')

  useEffect(() => {
    fetchAllMakers()
  }, [])

  const fetchAllMakers = async () => {
    const numberOfMakers = await API.getNumberOfMakers()
    setMakers(await API.getAllMakers(numberOfMakers))
  }
  const addNewModel = async (makerId, model, abrv) => {
    console.log(makerId, model, abrv)
    return await API.addNewModel({ makerId, model, abrv })
  }

  console.log(selectedMaker, name, abrv)

  return (
    <div>
      {
        makers.map((maker) => {
          return (
            <div key={maker.id}>
                <button onClick={() => { setSelectedMaker(maker.id) }}>{maker.name}</button>
            </div>
          )
        })
      }
      <input type='text' onInput={e => setName(e.target.value) } />
      <br/>
      <input type='text' onInput={e => setAbrv(e.target.value) } />
      <button onClick={() => { addNewModel(selectedMaker, name, abrv) }}>Insert</button>
    </div>
  )
})

export default AddNewVehicles
