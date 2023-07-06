import axios from 'axios';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setAuth } from '../features/auth/authSlice';

interface INavProps {
}

const Nav: React.FunctionComponent<INavProps> = (props) => {
  const auth = useAppSelector((state) => state.auth.value)
  const dispatch = useAppDispatch()

  const logout = async () => {
    await axios.post('user/logout', {}, {withCredentials: true })

    // axios.defaults.headers.common['Authorization'] = ``

    dispatch(setAuth(false));
  }

  let links

  if (auth){
    links = 
      <div className="text-end">
        <Link className="btn btn-success me-2" to="/login" onClick={logout}>Logout</Link >
      </div>
  } else {
    links = 
      <div className="text-end">
        <Link className="btn btn-success me-2" to="/login">Login</Link >
        <Link  className="btn btn-success me-2" to="/register">Register</Link >
      </div>
  }

  return (
    <header className="p-3 bg-dark">
        <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">     
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link className="btn btn-warning me-2" to="/">Home</Link ></li>
            </ul>

            {links}
        </div>
        </div>
    </header>
  );
};

export default Nav;
