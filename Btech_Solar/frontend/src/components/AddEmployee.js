import React from "react"
import { useState } from 'react'

export default function AddEmployee(){
  const [empID , setempID] = useState('')    
  const [department, setdepartment] = useState('')    
  const [firstName, setfirstName] = useState('')    
  const [lastName, setlastName] = useState('')
  const [userName, setuserName] = useState('')   
  const [email, setemail] = useState('')   
  const [contactNumber, setcontactNumber] = useState('')
  const [basicSal, setBasicSal] = useState('')
  const [designation, setDesignation] = useState('')
  const [nic, setNIC] = useState('')

  const [emailError, setEmailError] = useState('')
  const [mobileError, setMobileError] = useState('')     
  const [NICError, setNICError] = useState('')     

  const handleSubmit = async (e) => {
      e.preventDefault()

      const emp = {empID, department,firstName,lastName,userName,email,contactNumber,basicSal,designation,nic}

      const response = await fetch('http://localhost:4000/employee/add', {
          method: 'POST',
          body: JSON.stringify(emp),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      const json = await response.json()

      if(response.ok) {
        setempID('')
        setdepartment('')
        setfirstName('')
        setlastName('')
        setuserName('')
        setcontactNumber('')
        setBasicSal('')
        setDesignation('')
        setNIC('')
        setemail('')
          console.log('New Employee added', json)
          alert('Success')
      }

  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!value) {
      setEmailError('Email address is required')
    } else if (!emailRegex.test(value)) {
      setEmailError('Invalid email address')
    } else {
      setEmailError('')
    }
    setemail(value)
}

  const handleMobileChange = (e) => {
    const value = e.target.value
    if (!value) {
        setMobileError('Contact Number is required')
    } else if (value.length !== 10) {
        setMobileError('Contact Number should have 10 digits')
    } else if(value.indexOf('0')!==0){
      setMobileError('Invalid Contact Number!')
    } else {
        setMobileError('')
    }
    setcontactNumber(value)
}

const handleNIC = (e) => {
  const value = e.target.value;
  if (value.length !== 10 && value.length !== 12) {
    setNICError('Invalid NIC');
  } else if (value.length === 12 && /\D/.test(value)) {
    setNICError('Invalid NIC');
  } else if (value.length === 10 && value.slice(-1) !== 'V' && value.slice(-1) !== 'v') {
    setNICError('Old NIC should end with V');
  } else {
    setNICError('');
  }
  setNIC(value);
};

    return(
      <div>
       <div className="container">
       <h1>Employee Profile</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group row">
        <label className="col-sm-2 col-form-label">Employee ID</label>
       <div className="col-sm-10">
       <input type="Text" onChange={(e) => setempID(e.target.value)} value={empID} className="form-control" id="inputEmpID" placeholder="Employee ID"/>
   </div>
 </div>

 <div className="form-group row">
        <label className="col-sm-2 col-form-label">Department</label>
       <div className="col-sm-10">
       <input type="text" onChange={(e) => setdepartment(e.target.value)} value={department} className="form-control" id="inputDepartment" placeholder="Department"/>
   </div>
 </div>

 <div className="form-group row">
        <label className="col-sm-2 col-form-label">First Name</label>
       <div className="col-sm-10">
       <input type="text" onChange={(e) => setfirstName(e.target.value)} value={firstName} className="form-control" id="inputFirstName" placeholder="First Name"/>
   </div>
 </div>

 <div className="form-group row">
        <label className="col-sm-2 col-form-label">Last Name</label>
       <div className="col-sm-10">
       <input type="text" onChange={(e) => setlastName(e.target.value)} value={lastName} className="form-control" id="inputFirstName" placeholder="Last Name" />
   </div>
 </div>

 <div className="form-group row">
        <label className="col-sm-2 col-form-label">User Name</label>
       <div className="col-sm-10">
       <input type="text" onChange={(e) => setuserName(e.target.value)} value={userName} className="form-control" id="inputUserName" placeholder="User Name"/>
   </div>
 </div>

        <div className="form-group row">
        <label className="col-sm-2 col-form-label">Email</label>
       <div className="col-sm-10">
       <input type="email" onChange={handleEmailChange} className="form-control" id="inputEmail" placeholder="Email"/>
       {emailError && <div className="text-danger mb-3">{emailError}</div>}
   </div>
  </div>
    <div className="form-group row">
    <label className="col-sm-2 col-form-label">Contact Number</label>
    <div className="col-sm-10">
      <input type="text" onChange={handleMobileChange} value={contactNumber} className="form-control" placeholder="Contact Number"/>
      {mobileError && <div className="text-danger mb-3">{mobileError}</div>}
    </div>
  </div>

  <div className="form-group row">
    <label className="col-sm-2 col-form-label">Basic Salary</label>
    <div className="col-sm-10">
      <input type="text" onChange={(e) => setBasicSal(e.target.value)} value={basicSal} className="form-control" placeholder="Basic Salary"/>
    </div>
  </div>

  <div className="form-group row">
    <label className="col-sm-2 col-form-label">Designation</label>
    <div className="col-sm-10">
      <input type="text" onChange={(e) => setDesignation(e.target.value)} value={designation} className="form-control" placeholder="Designation"/>
    </div>
  </div>

  <div className="form-group row">
    <label className="col-sm-2 col-form-label">NIC</label>
    <div className="col-sm-10">
      <input type="text" onChange={handleNIC} value={nic} className="form-control" placeholder="NIC"/>
      {NICError && <div className="text-danger mb-3">{NICError}</div>}
    </div>
  </div>

  <div className="form-group row">
    <div className="col-sm-10">
      <button type="submit" className="btn btn-primary">Add Employee</button>
    </div>
  </div>

        </form>
      </div>
      </div>
    )
}