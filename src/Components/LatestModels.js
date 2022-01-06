import AudiA4 from '../audi-a4.png'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import '../LatestModels.css'

// Ova cijela komponenta je i dalje u izradi za neku buducnost kada se modeli
// modeli budu sortirali po datumu
const LatestModels = () => {
  const scroll = (direction) => {
    const element = document.getElementById('latest-models-list')
    if (direction === 'left') {
      element.scrollLeft += 350
    } else {
      element.scrollLeft -= 350
    }
  }
  return (
        <div className='latest-models-container'>
            <h1 className='latest-models-text'>Latest models:</h1>
            <div className='latest-models-section'>
              <div className='scroll-left' onClick={() => { scroll('right') }}>
                <IoIosArrowBack size='2rem' />
              </div>
              <div className='latest-models' id="latest-models-list">
                <div className='car-card'>
                  <h1>Audi A4</h1>
                  <img src={AudiA4} alt='audi' className='car-card-img' />
                  <div><h2>0-100km/h:</h2><p className='card-text'>&nbsp;5.2s</p></div>
                  <div><h2>CO2:</h2><p className='card-text'>&nbsp;173 g/km</p></div>
                  <div><h2>Consumption:</h2><p className='card-text'>&nbsp;6 l/100km</p></div>
                  <button className='more-info-button'>More info</button>
                </div>
                <div className='car-card'>
                  <h1>Audi A4</h1>
                  <img src={AudiA4} alt='audi' className='car-card-img' />
                  <div><h2>0-100km/h:</h2><p className='card-text'>&nbsp;5.2s</p></div>
                  <div><h2>CO2:</h2><p className='card-text'>&nbsp;173 g/km</p></div>
                  <div><h2>Consumption:</h2><p className='card-text'>&nbsp;6 l/100km</p></div>
                  <button className='more-info-button'>More info</button>
                </div>
                <div className='car-card'>
                  <h1>Audi A4</h1>
                  <img src={AudiA4} alt='audi' className='car-card-img' />
                  <div><h2>0-100km/h:</h2><p className='card-text'>&nbsp;5.2s</p></div>
                  <div><h2>CO2:</h2><p className='card-text'>&nbsp;173 g/km</p></div>
                  <div><h2>Consumption:</h2><p className='card-text'>&nbsp;6 l/100km</p></div>
                  <button className='more-info-button'>More info</button>
                </div>
                <div className='car-card'>
                  <h1>Audi A4</h1>
                  <img src={AudiA4} alt='audi' className='car-card-img' />
                  <div><h2>0-100km/h:</h2><p className='card-text'>&nbsp;5.2s</p></div>
                  <div><h2>CO2:</h2><p className='card-text'>&nbsp;173 g/km</p></div>
                  <div><h2>Consumption:</h2><p className='card-text'>&nbsp;6 l/100km</p></div>
                  <button className='more-info-button'>More info</button>
                </div>
              </div>
              <div className='scroll-right' onClick={() => { scroll('left') }}>
                <IoIosArrowForward size='2rem' />
              </div>
            </div>
            <h2 className='view-all-text'>View all models &gt;</h2>
          </div>
  )
}

export default LatestModels
