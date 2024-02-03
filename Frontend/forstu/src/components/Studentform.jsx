import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const Studentform = () => {

    const [student, setStudent] = useState({})
    const [academic, setAcademic] = useState({
        english: "",
        hindi: "",
        maths: "",
        science: "",
        project: ""
    })
    const [occupation, setOccupation] = useState("")
    const [income, setIncome] = useState()
    const [activity, setActivity] = useState({
        one: '',
        two: '',
        three: '',
    })

    const location = useLocation();
    let query = new URLSearchParams(location.search)
    const id = query.get("id")
    const userId = { "id": id }

    useEffect(() => {
        async function fetchdata() {
            const data = await axios.post("https://forstobackend.onrender.com/api/student", userId, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (data.data) {
                setStudent(data.data)
            }
        }
        fetchdata()
    }, [])

    // adding deails to the database 

    async function addDetails(e) {
        e.preventDefault()

        const formdata = {
            id: id,
            academic: academic,
            income: income,
            activity: activity,
            occupation: occupation
        }

        const data = await axios.post("https://forstobackend.onrender.com/api/update-student", formdata, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        console.log(data)

    }


    return (
        <div>
            <p>hello, {student.name ? student.name : "user"}</p>
            <p>Fill the details below, for further scholership process..</p>

            <div>
                <form onSubmit={addDetails}>
                    <div className='academic_section'>
                        <h3>academic</h3>
                        <label>english :</label>
                        <input placeholder='0-100' required={true} type='number' min={0} max={100} onChange={(e) => { setAcademic({ ...academic, english: e.target.value }) }} />
                        <br />
                        <label>hindi :</label>
                        <input placeholder='0-100' required={true} type='number' min={0} max={100} onChange={(e) => { setAcademic({ ...academic, hindi: e.target.value }) }} />
                        <br />
                        <label>maths :</label>
                        <input placeholder='0-100' required={true} type='number' min={0} max={100} onChange={(e) => { setAcademic({ ...academic, maths: e.target.value }) }} />
                        <br />
                        <label>science :</label>
                        <input placeholder='0-100' required={true} type='number' min={0} max={100} onChange={(e) => { setAcademic({ ...academic, science: e.target.value }) }} />
                        <br />
                        <label>project :</label>
                        <input placeholder='0-100' required={true} type='number' min={0} max={100} onChange={(e) => { setAcademic({ ...academic, project: e.target.value }) }} />
                    </div>

                    <div className='income_section'>
                        <h3>Income</h3>
                        <label>income :</label>
                        <input placeholder='income' required={true} type='number' min={100000} max={2000000} onChange={(e) => { setIncome(e.target.value) }} />
                    </div>

                    <div className='occupation_section'>
                        <h3>Occupation</h3>
                        <label>occupation :</label>
                        <input placeholder='occupation' required={true} type='text' onChange={(e) => { setOccupation(e.target.value) }} />
                    </div>

                    <div className='activity_section'>
                        <h3>Activiy</h3>
                        <label>activity :</label>
                        <input placeholder='Add and extracurricular actvites.' required={true} type='text' onChange={(e) => { setActivity({ ...activity, one: e.target.value }) }} />
                        <input placeholder='Add and extracurricular actvites.' type='text' onChange={(e) => { setActivity({ ...activity, two: e.target.value }) }} />
                        <input placeholder='Add and extracurricular actvites.' type='text' onChange={(e) => { setActivity({ ...activity, three: e.target.value }) }} />
                    </div>

                    <button type="submit">submit</button>
                </form>
            </div>
        </div>
    )
}

export default Studentform
