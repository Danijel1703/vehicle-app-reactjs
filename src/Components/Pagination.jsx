import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import '../Makers.css'

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
                    }}>
                    {pageNumber}
                    {console.log(store.currentPage)}
                </li>
            ))
          }
        </ul>
      </div>
  )
})

export default Pagination
