import * as React from 'react';
import { Link } from 'react-router-dom';

interface IPublicProps {
}

const Public: React.FunctionComponent<IPublicProps> = (props) => {
  return (
    <header className="p-3 bg-dark">
        <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">     
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><Link className="btn btn-warning me-2" to="/">Home</Link ></li>
                </ul>

                <h1>Dave Gray RTK Query Auth</h1>

                <Link className="btn btn-success me-2" to="/login">Login</Link >
            </div>
        </div>
    </header>
  );
};

export default Public;
