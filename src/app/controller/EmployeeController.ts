import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import errorMiddleware from "../middleware/errorMiddleware";
import { AddressService } from "../service/AddressService";
import authorize from "../middleware/authorizeMiddleware";
import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import { EmployeeAddress } from "../entities/EmployeeAddress";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
import { Users } from ".";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService, private addressService: AddressService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllEmployees);
    this.router.get(`${this.path}/:id`, this.getEmployeeById);
    this.router.post(`${this.path}`, 
      validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
      // validationMiddleware(CreateDepartmentDto,APP_CONSTANTS.body),
      this.createEmployee
    );
    this.router.put(`${this.path}`, this.updateEmployee);
    this.router.delete(`${this.path}/:id`, authorize([Users.ADMIN, Users.HR]), this.deleteEmployee);
    this.router.post(
      `${this.path}/login`,
      this.login
    );
  }
  private getAllEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      const empData = await this.employeeService.getAllEmployees();
      const addrData = await this.addressService.getAllAddresses();
      // // console.log(empData)
      const employees = empData.map(employee => {
        // // console.log(addrData.find(address => address.id === employee.employeeaddressId).city)
        let address = addrData.find(address => address.id === employee.employeeaddressId);
        return {
          id: employee.id,
          name: employee.name,
          role: employee.role,
          departmentId: employee.departmentId,
          city: address.city,
          state: address.state,
          pin: address.pin
        }
      })
      const data = {
        employees: employees
      }
      // console.log(employees)
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
    } catch (error) {
      return next(error);
    }
  }

  private getEmployeeById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      const employee = await this.employeeService.getEmployeeById(request.params.id);
      // console.log(employee)
      const address = await this.addressService.getAddressOfEmp(employee.employeeaddressId);
      // console.log(address)
      const data = {
        name: employee.name,
        role: employee.role,
        departmentId: employee.departmentId,
        city: address.city,
        state: address.state,
        pin: address.pin
      }
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
    } catch(error) {
      // console.log(error)
      return next(error);
    }

  }

  private createEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      // // console.log(request.body.address);
      const addrData = await this.addressService.createAddress(request.body.address);
      // // console.log(addrData)
      const empData = await this.employeeService.createEmployee(request.body, addrData.id);
      const data = {
        "employee": empData,
        "address": addrData
      }
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
    } catch (error) {
      return next(error);
    }
  }

  private updateEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      const newEmpData = await this.employeeService.updateEmployee(request.body);
      // // console.log(newEmpData);
      // // console.log(request.body)
      const address = plainToClass(EmployeeAddress, {
        id: newEmpData.employeeaddressId,
        city: request.body.city,
        state: request.body.state,
        pin: request.body.pin
      })
      // // console.log(address)
      const newAddrData = await this.addressService.updateAddress(address);
      const data = {
        "employee": newEmpData,
        "address": newAddrData
      }
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
    }
    catch(error) {
      return next(error);
    }
  }
  
  private deleteEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      response.send(this.employeeService.deleteEmployee(request.params.id));
    }
    catch(error) {
      return next(error);
    }
  }

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData = request.body;
    // console.log(loginData);
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.name.toLowerCase(),
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  };
}

export default EmployeeController;
