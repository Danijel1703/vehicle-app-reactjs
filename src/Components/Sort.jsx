import { observer } from 'mobx-react'
import PagingStore from '../Stores/PagingStore'
import '../Sort.css'

const Sort = observer(({ store, pageName }) => {
  const currentSort = store.currentSort
  const handleClick = (sort) => {
    store.setCurrentSort(sort)
    switch (pageName) {
      case 'models': {
        store.fetchCurrentPageModels(PagingStore.currentPage, sort)
        break
      }
      case 'makers': {
        store.fetchCurrentPageMakers(PagingStore.currentPage, sort)
        break
      }
    }
  }
  return (
        <div className='sort-by'>
                <h3>Sort by </h3>
                {pageName !== 'makers' && <h4
                className={currentSort === 'makeId' ? 'active' : ''}
                onClick={() => {
                  handleClick('makeId')
                }}>Maker</h4>}
                <h4
                className={currentSort === 'id' ? 'active' : ''}
                onClick={() => {
                  handleClick('id')
                }}>id</h4>
                <h4
                className={currentSort === 'name' ? 'active' : ''}
                onClick={() => {
                  handleClick('name')
                }}>Name</h4>
            </div>
  )
})

export default Sort
