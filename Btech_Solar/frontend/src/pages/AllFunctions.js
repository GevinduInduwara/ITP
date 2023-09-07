import { Link } from 'react-router-dom'

const AllFunctions = () => {
  return (
        <div className='container my-5'>
          <div class="text-center">
            <div className='row'>
              <Link to="/admincp"><button type="button" class="btn btn-primary">User Management</button></Link>
            </div>
            <div className='row my-3'>
            <Link to="/repairs"><button type="button" class="btn btn-primary">Repair Management</button></Link>
            </div>
            <div className='row my-3'>
            <Link to="/employee"><button type="button" class="btn btn-primary">Employee Management</button></Link>
            </div>
            <div className='row my-3'>
            <Link to="/inv"><button type="button" class="btn btn-primary">Inventory Management</button></Link>
            </div>
            <div className='row my-3'>
            <Link to="/promotions"><button type="button" class="btn btn-primary">Promotion Management</button></Link>
            </div>
            <div className='row my-3'>
            <Link to="/finance"><button type="button" class="btn btn-primary">Finance Management</button></Link>
            </div>
            <div className='row my-3'>
            <Link to="/admincp"><button type="button" class="btn btn-primary">Project Management</button></Link>
            </div>
            <div className='row my-3'>
            <Link to="/admincp"><button type="button" class="btn btn-primary">Vehicle Management</button></Link>
            </div>
          </div>
        </div>
    
  )
}

export default AllFunctions