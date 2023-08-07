import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import EmployeeData from './pages/EmployeeData';
import Login from './pages/Login';
import AddEmployee from './pages/AddEmployee';
import EmployeeStatus from './pages/EmployeeStatus';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path='/' element={<EmployeeData />} />
          <Route path="home" element={<Home />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="addEmployee" element={<AddEmployee/>} />
          <Route path="employeeStatus" element={<EmployeeStatus />} />
        </Route>
        <Route path='/' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
