import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import '../Filter.css'
import PagingStore from '../Stores/PagingStore'

const Filter = observer(({ store }) => {
  const makers = store.allMakers
  const currentPage = PagingStore.currentPage
  useEffect(() => {
    store.setAllMakers()
  }, [])
  return (
        <div className='filter'>
            <h3>Filter cars:</h3>
            <ul className='filter-list'>
                {
                    makers?.map(maker => <li key={maker.id}>
                        <p>{maker.name}</p>
                        <input type='checkbox' id={maker.id} onChange={event => store.setWhitelist(event, maker.id, currentPage)} />
                    </li>)
                }
            </ul>
        </div>
  )
})

export default Filter
