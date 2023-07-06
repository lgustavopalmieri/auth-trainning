import axios from 'axios';
import * as React from 'react';

interface IForgotProps {
}

const Forgot: React.FunctionComponent<IForgotProps> = (props) => {
    const [email, setEmail] = React.useState('')
    const [notify, setNotify] = React.useState({
        show: false,
        error: false,
        message: '',
    })

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
           await axios.post('reset/forgot', {email})

            setNotify({
                show: true,
                error: false,
                message: `Check your email`,
            })
        } catch (error) {
            setNotify({
                show: true,
                error: true,
                message: `An error occurred`,
            })
        }
    }

    let info

    if (notify.show) {
        info = 
        <div className={notify.error ? 'alert alert-danger' : 'alert alert-success'} role='alert'>
            {notify.message}
        </div>
    }

  return (
    <main className="form-signin w-100 m-auto">
        {info}
        <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please put your email</h1>

            <div className="form-floating">
                <input onChange={(e) => setEmail(e.target.value)}
                    className="form-control" id="email" placeholder="Email" />
                <label htmlFor="email">Email address</label>
            </div>

            <button className="w-100 mt-2 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </main>
  );
};

export default Forgot;
