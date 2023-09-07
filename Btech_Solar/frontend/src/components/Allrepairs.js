import { Link } from 'react-router-dom'

const Allrepairs = ({ repairs, index }) => {

    const handleClick = async () => {
        const response = await fetch('http://localhost:4000/api/repairs/' + repairs._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        window.location.href = '/repairs';
        if(response.ok) {
            console.log(json)
        }
    }

    const formatDate = (inputdate) => {
        const date = new Date(inputdate);
        return date.toISOString().split('T')[0];
      };

    return (
        <tr key={index}>
        <td>{index + 1}</td>
        <td>{repairs.projectId}</td>
        <td>Rs. {repairs.cost}</td>
        <td>{formatDate(repairs.serviceDate)}</td>
        <td>{formatDate(repairs.date)}</td>
        <td>{repairs.description}</td>
        <td>
            <Link to={`/repair/${repairs._id}`}><button className="btn btn-success btn-sm btn-rounded">Edit</button></Link>&nbsp;&nbsp;
            <button className="btn btn-sm btn-danger" onClick={handleClick}>Delete</button>
        </td>
        </tr>
    )
}

export default Allrepairs