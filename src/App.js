
import './App.css';
import Login from './pages/Login/Login.js';
import Home from './pages/Home/Home.js';
import Profile from './pages/profile/profile';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const user = true;
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to='login' />} />
          <Route path="/login" element={user ? <Navigate to='/' /> : <Login />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to='login' />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
