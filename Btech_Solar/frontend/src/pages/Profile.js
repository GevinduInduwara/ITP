import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import avatar from '../assets/profile.png'

export const Profile = () => {
    const { id } = useParams();
    const [ user, setUserdetails ] = useState(null)

    const [mobileError, setMobileError] = useState('')

    useEffect(() => {
        const fetchUser = async (id) => {
            const response = await fetch(`http://localhost:4000/api/user/profile/${id}`)
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

        const response = await fetch('http://localhost:4000/api/user/profile/' + user._id, {
            method: 'PATCH',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await response.json()

        if(response.ok) {
            alert('Successfully edited the profile')
        }

    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        setUserdetails(prevState => ({
            ...prevState,
            avatar: base64
        }))
    }

    const handleMobileChange = (e) => {
        const value = e.target.value
        if (!value) {
            setMobileError('Mobile number is required')
        } else if (value.length !== 10) {
            setMobileError('Mobile number should have 10 digits')
        } else if(value.indexOf('0')!==0){
            setMobileError('Invalid mobile number!')
        } else {
            setMobileError('')
        }
        setUserdetails(prevState => ({
            ...prevState,
            mobile : value}))
    }
    
    return (
        <div>
            <div>
            {user ? (
            <section>
            <div className="container">
            <div className="row">
                <div className="col-12 col-7 col-md-5 pt-4 m-auto">
                <div className="card border-0 shadow rounded">
                    <div className="card-body">
                        <div className="text-center">
                            <label htmlFor="fileInput" className="custom-file-upload" >
                                <img src={user.avatar || avatar} alt="avatar" className="custom-file-upload" style={{cursor: "pointer"}} />
                            </label>
                                <input type="file" name="avatar" id="fileInput" accept=".jpeg, .jpg, .png" style={{ display: "none" }} onChange={(e) => handleFileUpload(e)} />
                        </div>
                    <h1 className="font-bold my-4 text-center">{user.firstname} {user.lastname}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <small>First Name</small>
                                    <input type="text" name="firstname" className="form-control mb-4" onChange={handleInputChange} defaultValue={user.firstname}/>
                                </div>
                                <div className="col-md-6">
                                    <small>Last Name</small>
                                    <input type="text" name="lastname" className="form-control mb-4" onChange={handleInputChange} defaultValue={user.lastname}/>
                                </div>
                            </div>
                        </div>
                        <small>Email</small>
                        <input type="email" name="email" className="form-control mb-4" onChange={handleInputChange} defaultValue={user.email} disabled />
                        <small>Mobile Number</small>
                        <input type="text" name="mobile" className="form-control mb-1" onChange={handleMobileChange} defaultValue={user.mobile}/>
                            {mobileError && <div className="text-danger mb-3">{mobileError}</div>}
                        <small>Address</small>
                        <input type="text" name="address" className="form-control mb-4" onChange={handleInputChange} defaultValue={user.address}/>
                        <div className="text-center my-4">
                            <div className="d-grid gap-2">
                                <button className="btn btn-success">Save</button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </section>
            ) : (
                <p>Loading...</p>
            )}
            </div>
        </div>
    )
}

export default Profile

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}