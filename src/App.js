import './App.css';
import Login from './components/authentication/login';
import { Route,Routes } from 'react-router-dom';
import Register from './components/authentication/register';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  
  );
}

export default App;
