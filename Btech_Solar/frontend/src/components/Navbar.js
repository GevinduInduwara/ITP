import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import logo from '../assets/Company_Logo.png'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-2 bg-white rounded">
    <div className="container-fluid px-8">
      <Link to="/"><img className="mx-5" src={logo} alt='logo' width={130} height={80}/></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item mx-3">
            <Link to="/" className='navbar-items'><h4 className="nav-link active fs-3">Home</h4></Link>
          </li>
          <li className="nav-item mx-3">
            <Link to="/aboutus" className='navbar-items'><h4 className="nav-link fs-3">About Us</h4></Link>
          </li>
          <li className="nav-item mx-3">
            <Link to="/" className='navbar-items'><h4 className="nav-link fs-3">Contact Us</h4></Link>
          </li>
          <li className="nav-item mx-3">
          <Link to="/add" className='navbar-items'><h4 className="nav-link fs-3">Repair</h4></Link>
          </li>
        </ul>
        <div className="d-flex ms-auto">
        {user && (
          <div>
            {user.isAdmin === true && (
              <Link to="/functions"><button className='btn btn-outline-primary mx-1'>Admin CP</button></Link>
            )}   
            <Link to={`/profile/${user.id}`}><button className='btn btn-outline-success mx-1'>{user.name}</button></Link>
            <button onClick={handleClick} className='btn btn-outline-danger mx-1'>Logout</button>
          </div>
          )}
          {!user && (
          <div>
            <Link to="/login"><button type="button" className="btn btn-home mx-1">Login</button></Link>
            <Link to="/signup"><button type="button" className="btn btn-home mx-1">Signup</button></Link>
          </div>
          )}
        </div>
      </div>
    </div>
    </nav>
  )
}

export default Navbar