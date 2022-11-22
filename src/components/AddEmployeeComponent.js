import React, {useEffect, useState} from 'react';
import EmployeeService from "../services/EmployeeService";
import {Link, useHistory, useParams} from "react-router-dom";

const AddEmployeeComponent = () => {
   const [name,setName]= useState()
    const [surname,setSurname]= useState()
    const [phone,setPhone]= useState()
    const [email,setEmail]= useState()
    const [gender,setGender]= useState()
    const [dob,setDob]= useState()
    const history = useHistory()
    const {id} = useParams()

    const saveOrUpdateEmployee = (e) => {
     e.preventDefault();

     const  employee = {name,surname,phone,email,dob,gender}
        if(id){
            EmployeeService.updateEmployee(id,employee).then((response) =>{
                history.push('/employees')
            }).catch(error =>{
                console.log(error)
            })
        }else {
            EmployeeService.createEmployee(employee).then((response) => {
                console.log(response.data)
                history.push('/employees')
            }).catch(error => {
                console.log(error)
            })
        }
    }
    useEffect(()=>{
        EmployeeService.getEmployeeById(id).then((response)=>{
            setName(response.data.name)
            setSurname(response.data.surname)
            setPhone(response.data.phone)
            setEmail(response.data.email)
            setDob(response.data.dob)
            setGender(response.data.gender)
        }).catch(error =>{
            console.log(error)
        })
    },[])
    const title = () =>{
       if(id){
           return   <h3 className="text-center">Edit Employee</h3>
       }else{
           return   <h3 className="text-center">Add Employee</h3>
       }
    }
    return (

        <div className="container">
            <br/><br/>
           <div className="row">
               <div className="card col-md-6 offset-md-3 offset-md-3">
                   {title()}
                   <div className="card-body">
                       <form>
                           <div className="form-group mb-2">
                               <label className="form-label">Name :</label>
                               <input
                                   type="text"
                                   placeholder="Enter Name"
                                   name="name"
                                   className="form-control"
                                   value={name}
                                   required
                                   onChange={(e) => setName((e).target.value)}/>
                           </div>
                           <div className="form-group mb-2">
                               <label className="form-label">Surname :</label>
                               <input
                                   type="text"
                                   placeholder="Enter Surname"
                                   name="surname"
                                   className="form-control"
                                   value={surname}
                                   required
                                   onChange={(e) => setSurname(e.target.value)}/>
                           </div>

                           <div className="form-group mb-2">
                               <label className="form-label">Phone :</label>
                               <input
                                   type="text"
                                   placeholder="Enter Phone Number"
                                   name="phone"
                                   className="form-control"
                                   value={phone}
                                   required
                                   onChange={(e) => setPhone(e.target.value)}/>
                           </div>
                           <div className="form-group mb-2">
                               <label className="form-label">Email :</label>
                               <input
                                   type="text"
                                   placeholder="Enter Email Address"
                                   name="email"
                                   className="form-control"
                                   value={email}
                                   required
                                   onChange={(e) => setEmail(e.target.value)}/>
                           </div>
                           <div className="form-group mb-2">
                               <label className="form-label">DOB</label>
                               <input
                                   type="text"
                                   placeholder="Enter Date Of Birth"
                                   name="dob"
                                   className="form-control"
                                   value={dob}
                                   required
                                   onChange={(e) => setDob(e.target.value)}/>
                           </div>
                           <div className="form-group mb-2">
                               <label className="form-label">Gender</label>
                               <input
                                   type="text"
                                   placeholder="Enter Gender"
                                   name="gender"
                                   className="form-control"
                                   value={gender}
                                   required
                                   onChange={(e) => setGender(e.target.value)}/>
                           </div>
                        <button className="btn btn-primary mt-2" onClick={(e)=>saveOrUpdateEmployee(e)} >Save</button>
                           <Link to ="/" className="btn btn-danger m-2">Cancel</Link>
                       </form>
                   </div>
               </div>
           </div>
        </div>
    );
};

export default AddEmployeeComponent;