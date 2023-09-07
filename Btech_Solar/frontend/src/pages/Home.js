import homeimage from '../assets/solar_home_2.jpg'

const Home = () => {
  return (
        <div className='container my-5'>
          <div className="col-md-12 mx-auto">
          <div className="row">
            <div className="col">
              <h1>Innovate Solar</h1>
              <h1>Solutions For Your </h1>
              <h1>Home</h1>
            </div>
            <div className="col">
              <img src={homeimage} className='rounded mt-5' alt='homeimage'/>
              <div className='home-shape'></div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-5">
              <span className='fs-5'>Our Experts will help make your home eco-friendly and entirely self sufficient</span>
            </div>
          </div>
            <div className="col-md-5 mt-5">
              <button type="button" className="btn btn-home btn-lg">Get Started</button>
            </div>
          </div>
        </div>
    
  )
}

export default Home