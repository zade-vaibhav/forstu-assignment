import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Studentform from './components/Studentform';
import AdminPannel from './components/AdminPannel';

function App() {

  return (
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<AdminPannel/>}/>
   <Route path='/student-form' element={<Studentform/>} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
