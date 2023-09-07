import { useEffect, useState } from 'react'
import AllEmployees from './AllEmployees'
import generatePDF from "./EmployeeReport"

const Employees = () => {
    const [emp, setEmp] = useState(null)
    const [query, setQuery] = useState('')

    useEffect(() => {
        const fetchAllEmployees = async () => {
        const response = await fetch('http://localhost:4000/employee')
        const json = await response.json()

        if (response.ok) {
            setEmp(json)
        }
        }
        fetchAllEmployees()
    }, [])

    const keys = ['empID', 'userName']

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
            <div className='form-outline w-25 mb-4'>
                <input id='search-input' type='search' className='form-control' placeholder='Search...' onChange={handleSearch}/>
            </div>
        <table class="table table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">ID</th>
                <th scope="col">Department</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Mobile No</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                    {search(emp).map((emp, index) => (
                    <AllEmployees key={emp._id} emps={emp} index={index} />
                    ))}

            </tbody>
            </table>
            {emp && (
                <button className="btn btn-sm btn-primary" onClick={() => generatePDF(emp)}>Generate Report</button>
                )}
                </div>
            </div>
    )
}

export default Employees