import axios from "axios";

// const EMPLOYEE_API_BASE_URL = "http://employee.ddns.net:8080/api/v1/employees";
// const EMPLOYEE_API_BASE_URL = "http://192.168.100.27:8080/api/v1/employees";
const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";

class EmployeeService {

    // async getEmployees() {
    //     return await axios.get(EMPLOYEE_API_BASE_URL);
    // }

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL,employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employeeId,employee){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId , employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }
}

export default new EmployeeService()