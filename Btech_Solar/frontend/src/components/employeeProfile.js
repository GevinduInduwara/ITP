import React from "react"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function AddEmployee(){


  const { id } = useParams();
  const [ user, setUserdetails ] = useState(null)

  useEffect(() => {
      const fetchUser = async (id) => {
          const response = await fetch(`http://localhost:4000/employee/${id}`)
          const json = await response.json()
  
          if(response.ok) {
              setUserdetails(json)
          }
      }
      fetchUser(id);
  }, [id])

  const handleInputChange = event => {
    const { name, value }= event.target;
    setUserdetails(prevState => ({
        ...prevState,
        [name]: value
    }))
}

    const handleSubmit = async (e) => {
      e.preventDefault()

      const response = await fetch('http://localhost:4000/employee/' + user._id, {
          method: 'PATCH',
          body: JSON.stringify(user),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      await response.json()

      if(response.ok) {
          window.location.href = '/employee';
      }

    }
    return(
      <div>
      {user ? (
       <div className="container">
        <h1>Employee Profile</h1>
         <form onSubmit={handleSubmit}>
         <div className="form-group row">
         <label className="col-sm-2 col-form-label">Employee ID</label>
        <div className="col-sm-10">
        <input type="Text" onChange={handleInputChange} name="empID" className="form-control" id="inputEmpID" placeholder="Employee ID" defaultValue={user.empID}/>
    </div>
  </div>

  <div className="form-group row">
         <label className="col-sm-2 col-form-label">Department</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" onChange={handleInputChange} name="department" id="inputDepartment" placeholder="Department" defaultValue={user.department}/>
    </div>
  </div>

  <div className="form-group row">
         <label className="col-sm-2 col-form-label">First Name</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" onChange={handleInputChange} name="firstName" id="inputFirstName" placeholder="First Name" defaultValue={user.firstName}/>
    </div>
  </div>

  <div className="form-group row">
         <label className="col-sm-2 col-form-label">Last Name</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" onChange={handleInputChange} name="lastName" id="inputFirstName" placeholder="Last Name" defaultValue={user.lastName}/>
    </div>
  </div>

  <div className="form-group row">
         <label className="col-sm-2 col-form-label">User Name</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" id="inputUserName" onChange={handleInputChange} name="userName" placeholder="User Name" defaultValue={user.userName}/>
    </div>
  </div>

         <div className="form-group row">
         <label className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" id="inputEmail" onChange={handleInputChange} name="email" placeholder="Email" defaultValue={user.email}/>
    </div>
  </div>
    <div className="form-group row">
    <label className="col-sm-2 col-form-label">Contact Number</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="inputContactNumber" onChange={handleInputChange} name="contactNumber" placeholder="Contact Number" defaultValue={user.contactNumber}/>
    </div>
  </div>
 
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">Basic Salary</label>
    <div className="col-sm-10">
      <input type="text" name="basicSal" onChange={handleInputChange} defaultValue={user.basicSal} className="form-control" placeholder="Basic Salary"/>
    </div>
  </div>

  <div className="form-group row">
    <label className="col-sm-2 col-form-label">Designation</label>
    <div className="col-sm-10">
      <input type="text" name="designation" onChange={handleInputChange} defaultValue={user.designation} className="form-control" placeholder="Designation"/>
    </div>
  </div>

  <div className="form-group row">
    <label className="col-sm-2 col-form-label">NIC</label>
    <div className="col-sm-10">
      <input type="text" name="nic" onChange={handleInputChange} defaultValue={user.nic} className="form-control" placeholder="NIC"/>
    </div>
  </div>

  <div className="form-group row">
    <div className="col-sm-10">
      <button type="submit" className="btn btn-primary">Update</button>
    </div>
  </div>

         </form>
  

       </div>
      ) : (
        <p>Loading</p>
      )}
      </div>
    )
}