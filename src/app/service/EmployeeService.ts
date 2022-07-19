import { plainToClass } from "class-transformer";
import { ObjectLiteral } from "typeorm";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import { EmployeeRespository } from "../repository/EmployeeRepository";
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt')

export class EmployeeService{
    constructor(private employeeRepo: EmployeeRespository){}
    async getAllEmployees(){
        return await this.employeeRepo.getAllEmployees();
    }
    async getEmployeeById(id: string) {
        const emp = await this.employeeRepo.getEmployeeById(id);
        if(!emp){
            throw new EntityNotFoundException({
                CODE: "404",
                MESSAGE: "Employee with given ID is not found"
            })
        }
        return emp;
    }
    // createEmployee(employeeData: ObjectLiteral) {
    //     return this.employeeRepo.createEmployee(employeeData);
    // }

    async updateEmployee(employeeData: ObjectLiteral) {
        employeeData.password = employeeData.password ?  await bcrypt.hash(employeeData.password, 10): ''
        // console.log(employeeData)
        const emp = plainToClass(Employee, {
          id: employeeData.id,
          name: employeeData.name,
          password: employeeData.password ?  await bcrypt.hash(employeeData.password, 10): '',
          // age: employeeData.age,
          departmentId: employeeData.departmentId,
          // isActive: true,
          role: employeeData.role,
          employeeaddressId: ""
        })
        const updatedEmp = await this.employeeRepo.updateEmployee(emp);
        // console.log(updatedEmp)
        return updatedEmp;
      }

    deleteEmployee(id: string) {
        return this.employeeRepo.deleteEmployee(id);
    }

    public async createEmployee(employeeDetails: any, addressId: string) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                // username: employeeDetails.username,
                password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
                // age: employeeDetails.age,
                departmentId: employeeDetails.departmentId,
                // isActive: true,
                role: employeeDetails.role,
                employeeaddressId: addressId
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            // console.log(save);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee");
        }
    }

    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          console.log(employeeDetails)
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "custom:role": employeeDetails.role
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException();
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  
}