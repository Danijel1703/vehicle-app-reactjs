import './App.css'
import Layout from './Layouts/Layout'
import {
  Routes,
  Route
} from 'react-router-dom'
import Home from './Pages/Home'

// eslint-disable-next-line react/prop-types
function App () {
  return (
    <>
      <Layout>
        <Routes>
            {/* <Route path='/' element={<App />} /> */}
            <Route path='/' element={<Home />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
