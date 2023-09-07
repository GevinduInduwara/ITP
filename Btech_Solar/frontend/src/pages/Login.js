import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
    <section>
    <div className="container mt-5 pt-5">
    <div className="row">
        <div className="col-12 col-7 col-md-4 m-auto">
        <div className="card border-0 shadow rounded">
            <div className="card-body">
            <h1 className="text-center font-bold">LOGIN</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" className="form-control my-4 py-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                <input type="password" className="form-control my-4 py-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <div className="text-center mt-3">
                <div className="d-grid gap-2">
                        <button className="btn btn-success" disabled={isLoading}>Login</button>
                    </div>
                <span className="nav-link mt-2"><Link to="/signup">Not a member?</Link></span>
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

export default Login