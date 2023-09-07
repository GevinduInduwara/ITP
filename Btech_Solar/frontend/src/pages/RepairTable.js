import { useEffect, useState } from 'react'
import Allrepairs from '../components/Allrepairs'
import {Link} from 'react-router-dom'
import generatePDF from "../components/RepairReport";

const RepairTable = () => {
    const [repairs, setRepairs] = useState(null)
    const [query, setQuery] = useState('')

    useEffect(() => {
        const fetchAllRepairs = async () => {
        const response = await fetch('http://localhost:4000/api/repairs')
        const json = await response.json()

        if (response.ok) {
          setRepairs(json)
        }
        }
        fetchAllRepairs()
    }, [])

    const keys = ['projectId', 'description']

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
                    <input id='search-input' type='search' className='form-control' placeholder='Search...' onChange={handleSearch}/>
                </div>
            </div>
            <div className='mb-3'>
                {repairs && (
                <button className="btn btn-sm btn-primary" onClick={() => generatePDF(repairs)}>Generate Report</button>
                )}
            </div>
            <table className='table align-middle mb-0 bg-white'>
                <thead className='bg-light'>
                    <tr>
                    <th scope="col">#</th>
                     <th scope="col">Project ID</th>
                     <th scope="col">Service Charge</th>
                     <th scope="col">Service Date</th>
                     <th scope="col">Created Date</th>
                     <th scope="col">Description</th>
                     <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {search(repairs).map((repair, index) => (
                    <Allrepairs key={repair._id} repairs={repair} index={index} />
                    ))}
                </tbody>
            </table>
            {/* <Link to='/add'><button className='btn btn-primary mt-5'>Add New Repair</button></Link> */}
        </div>
        </div>
    )
}

export default RepairTable