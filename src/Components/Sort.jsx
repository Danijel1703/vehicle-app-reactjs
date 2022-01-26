/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react'
import PagingStore from '../Stores/PagingStore'
import '../Sort.css'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'

const Sort = observer(({ store, pageName }) => {
  const currentSort = store.currentSort
  const isDropped = store.sortDropdown
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
        <div className='sort-by-dropdown' onClick={() => store.toggleSortDropdown()}>
          <h3>Sort by</h3>
          { isDropped ? <IoMdArrowDropup size='1.5rem' /> : <IoMdArrowDropdown size='1.5rem' /> }
        </div>
        {
          isDropped &&
            <ul className='sort-by-dropdown-list'>
              {
                pageName !== 'makers' &&
                <li
                  className={currentSort === 'makeId' ? 'active' : ''}
                  onClick={() => handleClick('makeId')}
                >
                    <h4>Maker</h4>
                </li>
              }
              <li
                  className={currentSort === 'id' ? 'active' : ''}
                  onClick={() => handleClick('id')}
              >
                    <h4>id</h4>
              </li>
              <li
                  className={currentSort === 'name' ? 'active' : ''}
                  onClick={() => handleClick('name')}
              >
                    <h4>Name</h4>
              </li>
            </ul>
        }
      </div>
  )
})

export default Sort
