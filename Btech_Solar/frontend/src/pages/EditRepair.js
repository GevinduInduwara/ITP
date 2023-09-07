import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const EditRepair = () => {
    const { id } = useParams();
    const [ repair, setRepair ] = useState(null)

    useEffect(() => {
        const fetchRepair = async (id) => {
            try {
              const response = await fetch(`http://localhost:4000/api/repairs/edit/${id}`);
              const json = await response.json();
            
              if (response.ok) {
                setRepair(json);
              } else {
                throw new Error('Error fetching repair');
              }
            } catch (error) {
              console.error(error);
              // Handle the error here, such as displaying an error message to the user
            }
          };
        fetchRepair(id);
    }, [id])

    
    const handleInputChange = event => {
        const { name, value }= event.target;
        setRepair(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const response = await fetch('http://localhost:4000/api/repairs/' + repair._id, {
            method: 'PATCH',
            body: JSON.stringify(repair),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await response.json()

        window.location.href = '/repairs';
        if(response.ok) {
        }

    }

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var minDate = tomorrow.toISOString().split('T')[0];
    return (
        <div>
            <div>
            {repair ? (

                <div className="container">
                <form className="form1" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Project Name</label>
                    <input type="text" name="projectId" defaultValue={repair.projectId} className="form-control" onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                    <label>Service Date</label>
                    <input type="date" name="serviceDate" defaultValue={new Date(repair.serviceDate).toLocaleDateString("en-CA")} className="form-control" onChange={handleInputChange} min={minDate}/>
                    </div>

                    <div className="form-group">
                    <label>Service Charge</label>
                    <input type="text" name="location" defaultValue={repair.cost} className="form-control" onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" defaultValue={repair.description} onChange={handleInputChange} className="form-control"/>
                    </div>
                    
                    <div className="form-group my-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                {/* <div className="form-group">
                <h1 className="text-success">Edit Repair Request</h1>
                <h4 className="mt-5 fw-bold">CUSTOMER</h4>
                <label htmlFor="exampleInputname">Customer Name</label>
                <input type="text" name="customerName" onChange={handleInputChange} className="form-control" defaultValue={repair.customerName} placeholder="Customer Name"/>
                </div>

                <div className="form-group">
                <label htmlFor="exampleInputnumber">Phone Number</label>
                <input type="text" name="customerPnum" defaultValue={repair.customerPnum} onChange={handleInputChange} className="form-control" placeholder="Phone Number"/>
                </div>

                <div className="form-group">
                <h4 className="mt-5 fw-bold">REPAIR DETAILS</h4>
                <label htmlFor="exampleInputmsg">Request no</label>
                <input type="text" name="requestNo" defaultValue={repair.requestNo} onChange={handleInputChange} className="form-control" placeholder="request number"/>
                </div>

                <div className="form-group">
                <label htmlFor="exampleInputnumber">Project no</label>
                <input type="text" name="projectNo" defaultValue={repair.projectNo} onChange={handleInputChange} className="form-control"placeholder="Project number"/>
                </div>

                <div className="form-group">
                <label htmlFor="exampleInputnumber">Warrent time</label>
                <input type="checkbox" name="warrentTime" value={repair.warrentTime} onChange={handleInputChange} className="" />
                </div>

                <div className="form-group">
                <label htmlFor="exampleInputnumber">Description</label>
                <input type="text" name="description" defaultValue={repair.description} onChange={handleInputChange} className="form-control" placeholder="discription"/>
                </div>

                <div className="form-group">
                <label htmlFor="exampleInputnumber">Assign group</label>
                <input type="text" name="repairGroup" defaultValue={repair.repairGroup} onChange={handleInputChange} className="form-control" placeholder="group name"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button> */}

                </form>

                </div>

            ) : (
                <p>Loading...</p>
            )}
            </div>
        </div>
    )
}

export default EditRepair
