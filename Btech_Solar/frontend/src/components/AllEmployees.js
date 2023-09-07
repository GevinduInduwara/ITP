import { Link } from 'react-router-dom'

const AllEmployees = ({ emps, index }) => {

    const handleClick = async () => {
        const response = await fetch('http://localhost:4000/employee/' + emps._id, {
            method: 'DELETE'
        })

        if(response.ok) {
            window.location.href = '/';
        }
    }

    return (
        <tr>
            <td>{index+1}</td>
            <td>{emps.empID}</td>
            <td>{emps.department}</td>
            <td>{emps.firstName}</td>
            <td>{emps.lastName}</td>
            <td>{emps.contactNumber}</td>
            <td>
                <Link to={`/employee/${emps._id}`}><button className="btn btn-primary mx-1">Edit</button></Link>
                <button className="btn btn-danger mx-1" onClick={handleClick}>Delete</button>
            </td>
        </tr>
    )
}

export default AllEmployees