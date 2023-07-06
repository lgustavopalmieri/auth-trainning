import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom";

import * as React from 'react';

interface IWelcomeProps {
}

const Welcome: React.FunctionComponent<IWelcomeProps> = (props) => {
   const user = useAppSelector(selectCurrentUser)
   const token = useAppSelector(selectCurrentToken)

   const welcome = user ? `Welcome ${user}` : `Welcome`
   const tokenAbbr = `${token.slice(0,9)}...`

   const content = (
    <section className="alert alert-success" role="alert">
        <h1>{welcome}</h1>
        <p>Token: {tokenAbbr}</p>
        <p><Link to="/welcome">Go to users list</Link></p>
    </section>
   )
  
    return content
};

export default Welcome;
