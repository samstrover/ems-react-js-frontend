import React, {useEffect, useState} from 'react';
import EmployeeService from "../services/EmployeeService";
import {Link} from "react-router-dom";
import Button from "bootstrap/js/src/button";

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    useEffect(() =>{
        getAllEmployees();
    },[])
    const getAllEmployees = () => {
        EmployeeService.getAllEmployees().then((response) =>{
            setEmployees(response.data)
        }).catch(error =>{
            console.log(error)
        })
    }
    const deleteEmployee = (employeeId)=>{
    EmployeeService.deleteEmployee(employeeId).then((response)=>{
    getAllEmployees();
    }).catch(error =>{
        console.log(error);
    })
    }
    return (
        <div className="container">
            <h2 className="text-center">Employees List</h2>
            <Link to = "/add-employee" className="btn btn-primary mb-5">Add Employee</Link>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                <th>Employee id</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Actions</th>
                </thead>
                <tbody>
                {
                    employees.map(
                        employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.surname}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.email}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.dob}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-employee/${employee.id}`}>Update</Link>
                                    <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={()=> deleteEmployee(employee.id)}>Delete</button>
                                </td>
                            </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeeComponent;