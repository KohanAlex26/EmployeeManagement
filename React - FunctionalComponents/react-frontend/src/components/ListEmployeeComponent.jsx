import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';


const ListEmployeeComponent = () => {

    const [employees,setEmployees] = useState([])

    useEffect(() => {
        getAllEmployees();
    }, [])
    

    const getAllEmployees = () =>{
        EmployeeService.getEmployees().then((response) => {
            setEmployees(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const deleteEmployee = (employeeId) => {
        EmployeeService.deleteEmployee(employeeId).then((response) => {
            getAllEmployees();
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="container">
            <h2 className="text-center">Employees List</h2>

            {/* <button className="btn btn-primary mb-2" onClick={()=>{window.location.assign('/add-employee')}} >Add Employee</button> */}
            <Link to="/add-employee" className="btn btn-primary mb-2">Add Employee</Link>

            <div className="row">
                <table className="table table-striped table-bordered">
                    
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            employees.map(
                                employee =>
                                <tr key= { employee.id }>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.emailId}</td>
                                    <td>
                                        <Link className="btn btn-info" to={`/edit-employee/${employee.id}`}>Update</Link>
                                        <button className="btn btn-danger" onClick={() => deleteEmployee(employee.id)} style={{marginLeft:"10px"}}> Delete</button>
                                        <Link className="btn btn-info" to={`/view-employee/${employee.id}`} style={{marginLeft:"10px"}}>View</Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>
            </div>

        </div>
    );
}

export default ListEmployeeComponent;