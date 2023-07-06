import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../app/hooks";
import { setCredentials } from "./auth/authSlice";
import { useLoginMutation } from "../app/authApiSlice";


interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
    const emailRef: any | null = useRef<HTMLInputElement | undefined>()
    const errRef: any | null = useRef<HTMLInputElement | undefined>()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        // emailRef.current.focus()
    })

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        try {
            const userData = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...userData, email })) // aqui pode ser id
            setEmail('')
            setPassword('')
            navigate('/welcome')
        } catch (error: any) {
            if (!error?.response) {
                setErrMsg('No Server Response')
            } else if (error.response.status === 400) {
                setErrMsg('Missing email or password')
            } else if (error.response.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }
            // errRef.current.focus()
        }
    }

    const handleEmailInput = (e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    const content = isLoading ? <h1>Loading...</h1> : (
        <main className="form-signin w-100 m-auto">
            <p ref={errRef} className={errMsg ? "alert alert-warning" : "alert alert-success"}></p>
        
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-floating">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text"
                        id="email"
                        ref={emailRef}
                        value={email} 
                        onChange={handleEmailInput}
                        className="form-control" 
                        placeholder="Email"
                        autoComplete="off"
                        required
                    />
                </div>

                <div className="form-floating">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="text"
                        id="password"
                        value={password} 
                        onChange={handlePasswordInput}
                        className="form-control" 
                        placeholder="password"
                        autoComplete="off"
                        required
                    />
                </div>
                <button className="w-100 mt-2 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>    
        
        </main>
    )

  return content;
};

export default Login;
