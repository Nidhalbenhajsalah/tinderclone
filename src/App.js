
import './App.css';
import Login from './pages/Login/Login.js';
import Home from './pages/Home/Home.js';
import Profile from './pages/profile/profile';
import ProfileView from './pages/profile_view/profile_view.js';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Setting from './pages/setting/setting.js';
import EditProfile from './pages/EditProfile/EditProfile.js';
import Chat from './pages/chat/chat.js';






function App() {
  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);

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
        setId(resObject.user.googleId);

      }).catch(err => {
        console.log(err);
      });
    }
    getUser();
  }, []);




  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <Home user={user} id={id} /> : <Navigate to='login' />} />
          <Route path="/login" element={user ? <Navigate to='/' /> : <Login />} />
          <Route path="/profile" element={user ? <Profile user={user} id={id} /> : <Navigate to='login' />} />
          <Route path='/profile_view' element={user ? <ProfileView user={user} id={id} /> : <Navigate to='login' />} />
          <Route path='profile/edit_profile' element={user ? <EditProfile user={user} id={id} /> : <Navigate to='login' />} />
          <Route path='profile/setting' element={user ? <Setting id={id} /> : <Navigate to='login' />} />
          <Route path='/chat' element={user ? <Chat user={user} id={id} /> : <Navigate to='login' />} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
