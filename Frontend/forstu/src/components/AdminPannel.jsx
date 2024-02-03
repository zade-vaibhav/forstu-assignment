
import { useEffect, useState } from 'react';
import axios from "axios"
import "./adminpannel.css"


const AdminPannel = () => {

    const [file, setFile] = useState("")
    const [token, setToken] = useState("")
    const [students,setStudent]=useState([])


    useEffect(() => {
        
        const storedToken = localStorage.getItem('accessToken');

        setToken(storedToken);

    }, []);

    async function uploadfile(e) {
        e.preventDefault()

        if (file == "") {
            console.log("add excel file")
        } else {
            const formdata = new FormData();

            formdata.append("file", file)

            const data = await axios.post("http://localhost:3002/api/uploadfile", formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then((res) => { return res }).catch((err) => { return err })
          setStudent([...students,data.data])
          console.log(data.data)
        }

    }


    // email logic

    async function sendEmail() {
        const data = await axios.get("http://localhost:3002/api/emailsent");
        console.log(data.data)
    }

    return (
        
            <div className="container">
            <nav className="navbar">
                <div className="logo">Admin Pannel</div>
                <div>
                   <button>login</button>
                </div>
            </nav>
            <div className='form_container'>
                <form onSubmit={uploadfile}>
                    <input type="file" name="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                    <button type='submit'>submit file</button>
                </form>

                <div>notify them with email</div>
                <button onClick={() => { sendEmail() }}>send</button>
            </div>
           
            {/* <div className='student'>
            <table>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Status</th>
  </tr>
  {
    students.length!==0?students.map((ind,i)=>{
return <tr key={i}>
    <td>{ind.name}</td>
    <td>{ind.email}</td>
    <td>{ind.schlorship.status}</td>
  </tr>
    }):""
  }
  
  
</table>
            </div> */}
        </div>

    )
}

export default AdminPannel
