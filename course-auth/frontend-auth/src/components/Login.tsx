import axios from 'axios';
import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';

interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')


    const [redirect, setRedirect] = React.useState(false)

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const { data } = await axios.post('user/login', {
            email: email,
            password: password,
        },{
          withCredentials: true, // cookie
        })

        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

        setRedirect(true)
    }

    if(redirect) {
        return <Navigate to="/"/>
    }

  return (
    <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please Login</h1>

            <div className="form-floating">
                <input onChange={(e) => setEmail(e.target.value)}
                    className="form-control" id="email" placeholder="Email" />
                <label htmlFor="email">Email</label>
            </div>
            
            <div className="form-floating">
                <input onChange={(e) => setPassword(e.target.value)}
                    type="password" className="form-control" id="password" placeholder="Password" />
                <label htmlFor="password">Password</label>
            </div>

            <div className='mb-3'>
                <Link to='/forgot'>Forgot Password</Link>
            </div>


            <button className="w-100 mt-2 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </main>
  );
};

export default Login;
