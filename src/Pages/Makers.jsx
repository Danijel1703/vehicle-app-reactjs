import { useEffect } from 'react'
import '../Makers.css'
import API from '../Common/API'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Pagination from '../Components/Pagination'
import PagingStore from '../Stores/PagingStore'

const Makers = observer(({ store }) => {
  // const numberOfPages = store.numberOfPages
  const currentPage = store.currentPage
  const searchMakers = store.searchMakers
  const allMakers = store.allMakers
  const currentPageMakers = store.currentPageMakers
  const currentSort = store.currentSort
  const images = store.images

  const importAllImages = (r) => {
    return r.keys().map(r)
  }

  const fetchAllMakers = async (sort = 'name') => {
    store.setCurrentSort(sort)
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
    const inputUpperCase = input.toUpperCase()
    if (input !== '') {
      store.setSearchMakers(allMakers.filter(maker => maker.name.toUpperCase().includes(inputUpperCase)))
    } else {
      store.setSearchMakers([])
    }
  }

  useEffect(() => {
    fetchAllMakers()
    store.setImages(importAllImages(require.context('../Common/images-makers/', false, /\.(png|jpe?g|svg)$/)))
  }, [])

  const searchBar = (
    <input type='text' placeholder='Search models...' onInput={e => {
      fetchSearchInputMaker(e.target.value)
    }} />
  )
  const displayMakers = currentPageMakers?.map((maker) => {
    const image = images.filter(image => image.includes(maker.name))
    console.log(image)
    return (
    <div className='car-card' key={maker.id}>
      <img className='car-card-image' alt='Maker logo goes here' src={image}/>
      <h1>Maker: {maker.name}</h1>
      <Link to={`/makerInfo/${maker.id}`} className='more-info-button'>
        <button>More info</button>
      </Link>
    </div>
    )
  })
  // const displayPageNavigation = numberOfPages?.map((pageNumber) => (
  //       <li
  //       key={pageNumber}
  //       className={pageNumber === store.currentPage ? 'active' : ''}
  //       onClick={() => {
  //         store.setCurrentPage(pageNumber)
  //         store.setCurrentPageModels(allMakers.filter(maker => maker.page === pageNumber))
  //       }}>
  //           {pageNumber}
  //       </li>
  // ))
  const displaySearchedItems = searchMakers?.map((searchMaker) => (
    <Link to={`/makerInfo/${searchMaker?.id}`} key={searchMaker.id}>
      <li>
              {searchMaker.name}
      </li>
    </Link>
  ))

  return (
    <div className='all-vehicles'>
      <div className='filter-options'>
        <div className='search-bar'>
          <h2>Search</h2>
          <div className='search-input'>
            {searchBar}
            {searchMakers?.length > 0 && <ul className='search-items'>{displaySearchedItems}</ul>}
          </div>
        </div>
        <div className='sort-by'>
            <h3>Sort by </h3>
            <h4
            className={currentSort === 'id' ? 'active' : ''}
            onClick={() => {
              fetchAllMakers('id')
            }}>id</h4>
            <h4
            className={currentSort === 'name' ? 'active' : ''}
            onClick={() => {
              fetchAllMakers('name')
            }}>Name</h4>
        </div>
      </div>
      <div className='car-cards-container'>
        {displayMakers}
      </div>
      {/* <div className='page-select'>
        <ul>
          {displayPageNavigation}
        </ul>
      </div> */}
      <Pagination store = {PagingStore} pageName = 'makers' />
    </div>
  )
})

export default Makers
