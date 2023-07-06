import axios from 'axios';
import * as React from 'react';
import { Navigate } from 'react-router-dom';

interface IRegisterProps {
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passwordConfirm, setPasswordConfirm] = React.useState('')

    const [redirect, setRedirect] = React.useState(false)

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        await axios.post('user/register', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            password_confirm: passwordConfirm
        })

        setRedirect(true)
    }

    if(redirect) {
        return <Navigate to="/login"/>
    }

  return (
    <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <div className="form-floating">
                <input onChange={(e) => setFirstName(e.target.value)} 
                    className="form-control" id="first_name" placeholder="First name" />
                <label htmlFor="first_name">First name</label>
            </div>

            <div className="form-floating">
                <input onChange={(e) => setLastName(e.target.value)}
                    className="form-control" id="last_name" placeholder="Last name" />
                <label htmlFor="last_name">Last name</label>
            </div>

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
            <div className="form-floating">
                <input onChange={(e) => setPasswordConfirm(e.target.value)} 
                    type="password" className="form-control" id="password_confirm" placeholder="Password confirm" />
                <label htmlFor="password_confirm">Password confirm</label>
            </div>

            <button className="w-100 mt-2 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </main>
  );
};

export default Register;
