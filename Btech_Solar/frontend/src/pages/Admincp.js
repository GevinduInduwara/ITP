import { useEffect, useState } from 'react'
import Allusers from '../components/Allusers'
import generatePDF from "../components/ReportGen"

const Admincp = () => {
    const [users, setUsers] = useState(null)
    const [query, setQuery] = useState('')

    useEffect(() => {
        const fetchAllusers = async () => {
        const response = await fetch('http://localhost:4000/api/user/admincp')
        const json = await response.json()

        if (response.ok) {
            setUsers(json)
        }
        }
        fetchAllusers()
    }, [])

    const keys = ['firstname', 'lastname', 'email']

    const search = (data) => {
        if (!data) {
            return [];
        }
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
        )
    }

    const handleSearch = (event) => {
        const { value } = event.target
        setQuery(value)
    }

    return (
        <div>
        <div className='container mt-5'>
            <div className='input-group d-flex justify-content-center my-3'>
                <div className='form-outline w-25'>
                    <input id='search-input' type='search' className='form-control' placeholder='Search...' onChange={handleSearch} />
                </div>
            </div>
            
            <div className='mb-3'>
                {users && (
                <button className="btn btn-sm btn-primary" onClick={() => generatePDF(users)}>Generate Report</button>
                )}
            </div>
            <table className='table align-middle mb-0 bg-light'>
                <thead className='bg-light'>
                    <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {search(users).map((user, index) => (
                    <Allusers key={user._id} users={user} index={index} />
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Admincp