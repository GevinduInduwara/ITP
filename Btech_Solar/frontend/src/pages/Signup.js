import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const {signup, error, isLoading} = useSignup()

    const [emailError, setEmailError] = useState('')
    const [passwordError, setConfirmPasswordError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(firstname, lastname, email, password, confirmpassword)
    }

    // Validate email address
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
        setEmail(value)
    }

    //Validate confirm password
    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        if (!value) {
          setConfirmPasswordError('Password is required');
        } else if (value !== password) {
          setConfirmPasswordError('Password does not match');
        } else {
          setConfirmPasswordError('');
        }
        setConfirmPassword(value);
      }

    return (
        <section>
        <div className="container mt-5 pt-5">
        <div className="row">
            <div className="col-12 col-7 col-md-5 m-auto">
            <div className="card border-0 shadow rounded">
                <div className="card-body">
                <h1 className="text-center font-bold my-4">SIGNUP</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <input type="text" className="form-control my-1 py-2" placeholder="First Name" onChange={(e) => setFirstname(e.target.value)} value={firstname}/>
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control my-1 py-2" placeholder="Last Name" onChange={(e) => setLastname(e.target.value)} value={lastname}/>
                            </div>
                        </div>
                    </div>
                    <input type="email" className="form-control mt-4 pt-2" placeholder="Email" onChange={handleEmailChange} value={email}/>
                    {emailError && <div className="text-danger mb-3">{emailError}</div>}
                    <div className="form-group">   
                        <div className="row">
                            <div className="col-md-6">
                                <input type="password" className="form-control mt-4 pt-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                            </div>
                            <div className="col-md-6">
                                <input type="password" className="form-control mt-4 pt-2" placeholder="Confirm Password" onChange={handleConfirmPasswordChange} value={confirmpassword}/>
                            </div>
                            {passwordError && <div className="text-danger">{passwordError}</div>}
                        </div>
                    </div>
                    <div className="text-center my-4">
                        <div className="d-grid gap-2">
                            <button className="btn btn-success" disabled={isLoading}>Sign up</button>
                        </div>
                        <span className="nav-link mt-2"><Link to="/login">Already a member?</Link></span>
                        {error && <div className='error'>{error}</div>}
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
        </section>
    )
}

export default Signup