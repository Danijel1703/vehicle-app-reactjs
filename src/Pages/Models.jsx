import { useEffect } from 'react'
import '../Models.css'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import Pagination from '../Components/Pagination'
import PagingStore from '../Stores/PagingStore'
import SearchBar from '../Components/SearchBar'
import SearchBarStore from '../Stores/SearchBarStore'
import ModelStore from '../Stores/ModelStore'
import Sort from '../Components/Sort'
import Filter from './Filter'

const Models = observer(({ store }) => {
  const currentPage = PagingStore.currentPage
  const currentPageModels = store.currentPageModels
  const images = store.images

  const importAllImages = (r) => {
    return r.keys().map(r)
  }

  useEffect(() => {
    store.setImages(importAllImages(require.context('../Common/images-models/', false, /\.(png|jpe?g|svg)$/)))
    store.fetchCurrentPageModels(currentPage)
  }, [])
  const displayModels = currentPageModels?.map((model) => {
    const image = images.filter(image => image.includes(model.name))
    return (
        <div className='car-card' key={model.id}>
          <img className='car-card-image' alt='Car image goes here' src={image}/>
          <h1>Model: {model.name}</h1>
          <Link to={`/vehicleInfo/${model.id}`} className='more-info-button'>
            <button>More info</button>
          </Link>
        </div>
    )
  })

  return (
        <div className='all-vehicles'>
          <div className='filter-options'>
            <SearchBar store={SearchBarStore} pageName='models' />
            <Sort store={ModelStore} pageName='models' />
            <Filter store={ModelStore} />
          </div>
          <div className='car-cards-container'>
            {displayModels}
          </div>
          <Pagination store={PagingStore} pageName='models' />
        </div>
  )
})

export default Models
