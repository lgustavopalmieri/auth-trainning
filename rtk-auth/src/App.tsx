import { Routes,  Route } from 'react-router-dom'
import './App.css';
import Layout from './components/Layout';
import Public from './components/Public';
import RequireAuth from './features/auth/RequireAuth';
import Welcome from './features/auth/Welcome';
import Login from './features/Login';
import UsersList from './features/users/UsersList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route index element={<Public />} />
            <Route path="login" element={<Login />} />

            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="welcome" element={<Welcome />} />
              <Route path="userslist" element={<UsersList/>} />
            </Route>
          </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
