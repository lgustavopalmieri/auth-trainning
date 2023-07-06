import axios from 'axios';
import * as React from 'react';
import { Navigate, useParams } from 'react-router-dom';

interface IResetProps {
}

const Reset: React.FunctionComponent<IResetProps> = (props) => {
    const [password, setPassword] = React.useState('')
    const [passwordConfirm, setPasswordConfirm] = React.useState('')
    const [redirect, setRedirect] = React.useState(false)
    const {token} = useParams()

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

       try {
        await axios.post('reset/reset', {
            token,
            password,
            password_confirm: passwordConfirm
           })
    
           setRedirect(true)
       } catch (error) {
        console.log(error)
       }
    }

    if(redirect) {
        return <Navigate to='/login' />
    }

  return (
    <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Reset your password</h1>

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

export default Reset;
