
import { useState } from 'react';
import axios from "axios"
import './App.css';

function App() {

  const [file,setFile]=useState("")

  async function uploadfile(e){
  e.preventDefault()
  
  if(file==""){
    console.log("add excel file")
  }else{
  const formdata=new FormData();
  formdata.append("file",file)

  const data=await axios.post("http://localhost:3002/api/uploadfile",formdata,
  {headers:{
    "Content-Type":"multipart/form-data"
  }}).then((res)=>{return res}).catch((err)=>{return err})
   console.log(data)
}

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
