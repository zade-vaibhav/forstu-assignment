import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Studentform from './components/Studentform';
import AdminPannel from './components/AdminPannel';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  return (
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<AdminPannel/>}/>
   <Route path='/student-form' element={<Studentform/>} />
   <Route path='/login' element={<Login/>} />
   <Route path='/register' element={<Register/>} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
