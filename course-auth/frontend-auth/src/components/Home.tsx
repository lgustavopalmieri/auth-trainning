import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setAuth } from '../features/auth/authSlice';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth.value)
  const [message, setMessage] = useState('You are not logged in')

  useEffect(() => {
    // shortway to async func inside useEffect
    (async () => {
     try {
      const { data } = await axios.get('user/user')

      setMessage(`Hi ${data.first_name}!`)
      dispatch(setAuth(true))
     } catch (error) {
      setMessage(`You are not authenticated!`)
      dispatch(setAuth(false))
     }
    }) ()
  }, [])

  return (
    <div className='container mt-5 text-center'>
        <h3>{auth ? message : 'You are not logged in'}</h3>
    </div>
  );
};

export default Home;
