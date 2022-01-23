import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import '../Pagination.css'
import VehicleMakeStore from '../Stores/MakerStore'
import VehicleModelStore from '../Stores/ModelStore'

const Pagination = observer(({ store, pageName }) => {
  useEffect(() => {
    store.fetchNumberOfPages(pageName)
  }, [])
  const numberOfPages = store.numberOfPages

  return (
    <div className='page-select'>
        <ul>
          {
            numberOfPages?.map((pageNumber) => (
                <li
                    key={pageNumber}
                    className={pageNumber === store.currentPage ? 'active' : ''}
                    onClick={() => {
                      store.setCurrentPage(pageNumber)
                      switch (pageName) {
                        case 'makers' : {
                          VehicleMakeStore.fetchCurrentPageMakers(pageNumber)
                          break
                        }
                        case 'models' : {
                          VehicleModelStore.fetchCurrentPageModels(pageNumber)
                          break
                        }
                      }
                    }}>
                    {pageNumber}
                </li>
            ))
          }
        </ul>
      </div>
  )
})

export default Pagination
