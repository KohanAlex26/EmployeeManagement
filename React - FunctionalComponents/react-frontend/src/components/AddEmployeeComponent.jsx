import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const AddEmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailId] = useState('')
    const history = useHistory();
    const {id} = useParams();

    const saveOrUpdateEmployee = (e) =>{
        //prevent refresh the page
        e.preventDefault();
        
        const employee = {firstName,lastName,emailId}

        if(id){
            EmployeeService.updateEmployee(id,employee).then((response) => {

                // console.log("update" + response.data)
    
                history.push('/employees');
    
            }).catch((error) => {
                console.log(error)
            })
        }
        else{
            EmployeeService.createEmployee(employee).then((response) => {

                console.log("save" + response.data)
    
                history.push('/employees');
    
            }).catch((error) => {
                console.log(error)
            })
    
        }
        
    }

    useEffect(() => {

        if(id)
        EmployeeService.getEmployeeById(id).then((response) =>{
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmailId(response.data.emailId)
        }).catch(error=> {
            console.log(error)
        })

    },[])
    
    const title = () => {
        if(id)
            return <h2 className="text-center">Update Employee</h2>
        else
            return <h2 className="text-center">Add Employee</h2>
    }

    return (
        <div>
            <br/><br/>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        
                        {
                            title()
                        }
                        
                        <div className="card-body">
                            <form>

                                <div className="form-group mb-2">
                                    <label className="form-label">First Name:</label>
                                    <input type="text" placeholder="Enter first name" name="firstName" className="form-control" defaultValue={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                                </div>
                                <div className="form-group mb-2">
                                    <label>Last Name:</label>
                                    <input type="text" placeholder="Enter last name" name="lastName" className="form-control" defaultValue={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                                </div>
                                <div className="form-group mb-2">
                                    <label>Email Id:</label>
                                    <input type="email" placeholder="Enter email address" name="emailId" className="form-control" defaultValue={emailId} onChange={(e)=>setEmailId(e.target.value)}/>
                                </div>

                                <button className="btn btn-success" onClick={(e)=>saveOrUpdateEmployee(e)}>Save</button>
                                <Link to="/employees" className="btn btn-danger">Cancel</Link>
                                
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default AddEmployeeComponent;