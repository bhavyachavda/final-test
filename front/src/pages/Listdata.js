import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';
// import 'bootstrap';

const Listdata = () => {
    const[ans,setAns] = useState([]);
    const[reloadpage, setreloadpage] = useState(false);
    const handledata = async () =>{
        await axios.get("http://localhost:8000/listdata",)
            
        .then((res) => {
            setAns(res.data);
        })

    }
    const navigate = useNavigate();

    useEffect(()=>{
        handledata();
    },[reloadpage])

    // const handleEdit = (recid) =>{
    //     // e.preventDefault();
    //     localStorage.setItem("id",recid)
    //     navigate("/Edit")
    // }

    // const handleDelete = async(recid) =>{
    //     try {
    //         console.log("Delete data",recid)
    //         const req = await axios.get("http://localhost:8000/deletedata",
    //         {params:{recid}})
    //         setreloadpage(!reloadpage)
    //     } catch (error) {
            
    //     }
    // }

    const handleEdit = (recid) =>{
        // e.preventDefault();
        // localStorage.setItem("id",recid)
        navigate("/Screen")
    }

    const handleDelete = async(recid) =>{
        try {
            console.log("Delete data",recid)
            const req = await axios.get("http://localhost:8000/deletedata",
            {params:{recid}})
            setreloadpage(!reloadpage)
        } catch (error) {
            
        }
    }

    const handleAdd = () =>{
        navigate("/screen")
    }

 

  return (
    <div>
        <button type="button" value="Add Employee" onClick={()=>{handleAdd()}} className="btn btn-dark" style={ {"marginTop": "5rem","marginLeft": "1rem"}}>Add User</button>
        {/* <button type="button" value="HR" onClick={()=>{handleHR()}} className="btn btn-primary" style={ {"marginTop": "5rem","marginLeft": "1rem"}}>HR</button>
        <button type="button" value="Location" onClick={()=>{handleLocation()}} className="btn btn-info" style={ {"marginTop": "5rem","marginLeft": "1rem"}}>Location</button> */}
        <table className="table table-striped" style={{ "width": "70vw", "marginTop": "1rem", "marginLeft": "1rem" }}>
            <tbody>
            <tr>
                <th>Recid</th>
                <th>Code</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Hobbies</th>
                <th>Photo</th>
                <th>Country</th>
                <th>Date Added</th>
                <th>Action</th>
                
            </tr>
            {
                ans.map((result)=>(
                    <tr>
                        <td>{result.recid}</td>
                        <td>{result.code}</td>
                        <td>{result.firstname}</td>
                        <td>{result.lastname}</td>
                        <td>{result.email}</td>
                        <td>{result.gender}</td>
                        <td>{result.hobbies}</td>
                        <td><img src='' width="100"></img></td>
                        <td>{result.country}</td>
                        <td>{result.dateadded}</td>
                        <td>
                        <button type="button" value="Edit" onClick={()=>{handleEdit(result.recid)}} className="btn btn-primary">Edit</button>&nbsp;
            
                        <button type="button" value="Delete" onClick={()=>{handleDelete(result.recid)}} className="btn btn-warning">Delete</button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
        </table>
    </div>
  );
}
export default Listdata;