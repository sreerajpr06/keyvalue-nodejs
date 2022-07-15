/**
 * Wraps Controllers for easy import from other modules
 */
import { AddressRepository } from "../repository/AddressRepository";
import { DepartmentRepository } from "../repository/DepartmentRepository";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { AddressService } from "../service/AddressService";
import { DepartmentService } from "../service/DepartmentService";
import { EmployeeService } from "../service/EmployeeService";
import DepartmentController from "./DepartmentController";
import EmployeeController from "./EmployeeController";
import HealthController from "./HealthController";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository()), new AddressService(new AddressRepository())),
  new DepartmentController(new DepartmentService(new DepartmentRepository))
];

export const enum Users {
  ADMIN = "admin",
  HR = "hr",
  MANAGER = "manager",
  ENGINEER = "engineer"
}