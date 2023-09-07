import { useState, useEffect } from "react"
import '../cssModels/NewRepairform.css'

const NewRepairform = () => {
    // const [customerName, setName] = useState('')
    // const [customerPnum, setPnum] = useState('')
    // const [requestNo, setReq] = useState('')
    // const [projectNo, setProject] = useState('')
    // const [warrentTime, setWarrnt] = useState('')
    // const [description, setDes] = useState('')
    // const [repairGroup, setRepairGrp] = useState('')
    // const [selectedOption, setSelectedOption] = useState("")

    const [projectId, setProjectNo] = useState('')
    const [project, setProject] = useState('')
    const [serviceDate, setServiceDate] = useState('')
    const [cost, setCost] = useState('')
    const [description, setDescription] = useState('')

    const [projectError, setprojectError] = useState('')

    const [selectedOption, setSelectedOption] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()

        const repair = { projectId, serviceDate, cost, description }

        const response = await fetch('http://localhost:4000/api/repairs/add', {
            method: 'POST',
            body: JSON.stringify(repair),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (response.ok) {
            setProjectNo('')
            setServiceDate('')
            setCost('')
            setDescription('')
            setProject('')
            setSelectedOption('')
            console.log('New Repair added', json)
            alert('Success')
        }

    }

    const handleProjectFind = async (e) => {
        e.preventDefault()
        setprojectError(null)

        const pass = { projectId }

        const response = await fetch('http://localhost:4000/project/repair', {
            method: 'POST',
            body: JSON.stringify(pass),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const json = await response.json()

        if (response.ok) {
            setProject(json)
        }
        else {
            setprojectError('Invalid project ID')
        }


    }

    //Date format
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var minDate = tomorrow.toISOString().split('T')[0];

    //Calculate service charge
    useEffect(() => {
        if (serviceDate) {
            const selectedDate = new Date(serviceDate); // Convert serviceDate to a Date object
            const today = new Date(); // Get the current date
        
            const timeDiff = Math.abs(selectedDate.getTime() - today.getTime()); // Get the time difference in milliseconds
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days and round up
        
            const maxCharge = 30000;
            const minCharge = 10000;

            let charge = maxCharge * (1 - daysDiff / 100); // Calculate the charge based on daysDiff

            charge = Math.max(charge, minCharge); // Ensure the charge is not lower than minCharge
            charge = Math.round(charge);

            setCost(charge);
        }
      }, [serviceDate]);
    return (

        <div className="container" style={{maxWidth:"800px"}}>
            <form onSubmit={handleSubmit}>

            <label className="mt-5">Do you have an existing project with us?</label>
            <div className="mb-4 mt-2" style={{maxWidth:"150px"}}>
            <select className="form-control" id="exampleSelect1" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                <option value="">Select Answer...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            </div>

            {selectedOption === "yes" && (
            <div>
            <div className="row g-2">
                <h4 className="mt-4 fw-bold">PROJECT DETAILS</h4>
                <label>Project No</label>
                <div className="col-auto">
                    <input type="text" name="projectNo" placeholder="Project Number" value={projectId} onChange={(e) => setProjectNo(e.target.value)} className="form-control"/>
                </div>
                <div className="col-auto">
                    <button className="btn btn-success" onClick={handleProjectFind}>Find</button>
                </div>
                {projectError && (<div className="text-danger mb-3">{projectError}</div>)}

                {project && !projectError && (
                <div>
                    <div className="form-group">
                    <label>Project Name</label>
                    <input type="text" name="projectName" value={project.projectName} className="form-control" style={{background:"#cccaca"}} readOnly/>
                    </div>

                    <div className="form-group">
                    <label>Project Location</label>
                    <input type="text" name="location" value={project.location} className="form-control" style={{background:"#cccaca"}} readOnly/>
                    </div>

                    <div className="form-group">
                    <label>Used Products</label>
                    <textarea name="usedProducts" value={project.usedProducts} className="form-control" style={{background:"#cccaca"}} readOnly/>
                    </div>

                    <div className="form-group">
                    <label>Service Date</label>
                    <input type="date" name="serviceDate" value={serviceDate} className="form-control" onChange={(e) => setServiceDate(e.target.value)} min={minDate}/>
                    </div>

                    <div className="form-group">
                    <label>Service Charge</label>
                    <input type="text" name="location" value={"Rs. "+cost} className="form-control" style={{background:"#cccaca"}} readOnly/>
                    </div>

                    <div className="form-group">
                    <label>Description</label>
                    <textarea name="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control"/>
                    </div>
                    
                    <div className="form-group my-3">
                        <button type="submit" className="btn btn-primary">Add Repair</button>
                    </div>
                </div>
                )}
            </div>
            </div>
            )}

        
        
            </form>
        </div>
    )

}

export default NewRepairform