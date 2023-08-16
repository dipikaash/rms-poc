import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import EmployeeTable from './components/employeeDetail/EmployeeTable';
import Login from './pages/Login';
import AddEmployee from './components/popup/AddEmployee';
import EmployeeStatus from './components/status/EmployeeStatus';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path='/' element={<EmployeeTable />} />
          <Route path="home" element={<Home />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="addEmployee" element={<AddEmployee/>} />
          <Route path="employeeStatus" element={<EmployeeStatus />} />
        </Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
