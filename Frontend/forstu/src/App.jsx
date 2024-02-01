
import { useState } from 'react';
import axios from "axios"
import './App.css';

function App() {

  const [file,setFile]=useState("")

  async function uploadfile(e){
  e.preventDefault()
  
  const formdata=new FormData();
  formdata.append("file",file)
  await axios.post("http://localhost:3002/api/uploadfile",formdata,
  {headers:{
    "Content-Type":"multipart/form-data"
  }})

  }
  return (
    <div className="App">
      <form onSubmit={uploadfile}>
        <input type="file" name="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
        <button type='submit'>submit file</button>
      </form>
    </div>
  );
}

export default App;
