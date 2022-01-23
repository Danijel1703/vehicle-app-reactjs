import { useEffect } from 'react'
import '../Makers.css'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Pagination from '../Components/Pagination'
import PagingStore from '../Stores/PagingStore'
import SearchBar from '../Components/SearchBar'
import SearchBarStore from '../Stores/SearchBarStore'
import Sort from '../Components/Sort'
import MakerStore from '../Stores/MakerStore'

const Makers = observer(({ store }) => {
  const currentPage = PagingStore.currentPage
  const currentPageMakers = store.currentPageMakers
  const images = store.images

  const importAllImages = (r) => {
    return r.keys().map(r)
  }

  useEffect(() => {
    store.setImages(importAllImages(require.context('../Common/images-makers/', false, /\.(png|jpe?g|svg)$/)))
    store.fetchCurrentPageMakers(currentPage)
  }, [])

  const displayMakers = currentPageMakers?.map((maker) => {
    const image = images.filter(image => image.includes(maker.name))
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

  return (
    <div className='all-vehicles'>
      <div className='filter-options'>
        <SearchBar store={SearchBarStore} pageName='makers' />
        <Sort store={MakerStore} pageName='makers' />
      </div>
      <div className='car-cards-container'>
        {displayMakers}
      </div>
      <Pagination store = {PagingStore} pageName = 'makers' />
    </div>
  )
})

export default Makers
