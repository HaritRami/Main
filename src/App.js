import './App.css';
import Login from './components/authentication/login';
import { Route, Routes } from 'react-router-dom';
import Register from './components/authentication/register';
import Home from './components/pages/home';
import About from './components/pages/about';
import BookParking from './components/pages/parkingBooking';
import ForgotPassword from './components/authentication/fogetPassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/book-parking" element={<BookParking />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>

  );
}

export default App;
