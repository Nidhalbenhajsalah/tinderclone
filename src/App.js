
import './App.css';
import Login from './pages/Login/Login.js';
import Home from './pages/Home/Home.js';
import Profile from './pages/profile/profile';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      fetch('http://localhost:8001/auth/login/sucess', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(res => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error('Something went wrong');
      }).then(resObject => {
        setUser(resObject.user);
      }).catch(err => {
        console.log(err);
      });
    }
    getUser();
  }, []);

  console.log(user);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <Home user={user} /> : <Navigate to='login' />} />
          <Route path="/login" element={user ? <Navigate to='/' /> : <Login />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to='login' />} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
