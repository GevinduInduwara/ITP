import { Link } from 'react-router-dom'

const Allusers = ({ users, index }) => {

    const handleClick = async () => {
        const response = await fetch('http://localhost:4000/api/user/profile/' + users._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok) {
            console.log(json)
            alert('Successfully deleted')
        }
    }

    return (
        <tr key={index}>
        <td>{index + 1}</td>
        <td>
            <div className="d-flex align-items-center">
            <div className="ms-3">
                <p className="fw-bold mb-1">{users.firstname} {users.lastname}</p>
                <p className="text-muted mb-0">{users.email}</p>
            </div>
            </div>
        </td>
        <td>
        {(() => {
            if (users.isAdmin) {
            return (
                <span className="badge text-bg-danger">Admin</span>
            )
            } else {
            return (
                <span className="badge text-bg-primary">User</span>
            )
            }
        })()}
        </td>
        <td>
            <p className="fw-normal mb-1">{users.mobile}</p>
        </td>
        <td>{users.address}</td>
        <td>
            <Link to={`/profile/${users._id}`}><button className="btn btn-success btn-sm btn-rounded">Edit</button></Link>&nbsp;&nbsp;
            <button className="btn btn-sm btn-danger" onClick={handleClick}>Delete</button>
        </td>
        </tr>
    )
}

export default Allusers