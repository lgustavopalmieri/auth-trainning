import * as React from 'react';
import { Outlet } from 'react-router-dom';

interface ILayoutProps {
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  return <Outlet />;
};

export default Layout;
