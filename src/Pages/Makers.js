import { useEffect } from 'react/cjs/react.development'
import '../Vehicles.css'
import API from '../Common/API'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const Makers = observer(({ store }) => {
  const numberOfPages = store.numberOfPages
  const currentPage = store.currentPage
  const searchedMaker = store.searchedMaker
  const allMakers = store.allMakers
  const currentPageMakers = store.currentPageMakers

  const fetchAllMakers = async (sort = 'name') => {
    const numberOfMakers = await API.getNumberOfMakers()
    store.setNumberOfPages(numberOfMakers)
    const makers = await API.getAllMakers(numberOfMakers, sort)
    makers.forEach((maker) => {
      maker.page = Math.floor(makers.indexOf(maker) / 10) + 1
    })
    store.setAllMakers(makers)
    store.setCurrentPageMakers(makers.filter(maker => maker.page === currentPage))
  }
  const fetchSearchInputMaker = async (input) => {
    const maker = await API.getSearchInputMaker(input)
    store.setModelSearchedMaker(maker)
  }

  useEffect(() => {
    fetchAllMakers()
  }, [])

  const searchBar = (
    <input type='text' onInput={e => {
      fetchSearchInputMaker(e.target.value)
    }} />
  )
  const displayModels = currentPageMakers?.map((maker) => (
        <Link key={maker.id} to={`/makerInfo/${maker.id}`}><button>{maker.name}</button></Link>
  ))
  const displayPageNavigation = numberOfPages?.map((pageNumber) => (
        <li
        key={pageNumber}
        className={pageNumber === store.currentPage ? 'active' : ''}
        onClick={() => {
          store.setCurrentPage(pageNumber)
          store.setCurrentPageModels(allMakers.filter(maker => maker.page === pageNumber))
        }}>
            {pageNumber}
        </li>
  ))
  const displaySearchedItems = (
    <h1>{searchedMaker?.name}</h1>
  )

  return (
        <div className='all-vehicles'>
          <div className='filter-options'>
            <div className='search-bar'>
              <h2>Search: </h2>
              {searchBar}
            </div>
            <div className='sort-by'>
              <h3>Sort by: </h3>
              <h3 onClick={() => {
                fetchAllMakers('id')
              }}>id</h3>
              <h3 onClick={() => {
                fetchAllMakers('name')
              }}>Name</h3>
            </div>
            {displaySearchedItems}
          </div>
          <div className='car-cards-container'>
            {displayModels}
          </div>
          <div className='page-select'>
            <ul>
              {displayPageNavigation}
            </ul>
          </div>
        </div>
  )
})

export default Makers
