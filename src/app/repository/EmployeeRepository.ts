import { plainToClass } from "class-transformer";
import { getConnection, ObjectLiteral } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }

    async getEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne(id);
    }

    async deleteEmployee(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softDelete(id);
    }

    async updateEmployee(employeeData: ObjectLiteral) {
        const employeeRepo = getConnection().getRepository(Employee);
        // console.log(employeeData)
        const oldEmp = await employeeRepo.findOne(employeeData.id);
        employeeData.employeeaddressId = oldEmp.employeeaddressId;
        await employeeRepo.update(employeeData.id, employeeData);
        const newEmp =  await employeeRepo.findOne(employeeData.id);
        // console.log(newEmp)
        return newEmp;
    }

    // async createEmployee(employeeData: ObjectLiteral) {
    //     const employeeRepo = getConnection().getRepository(Employee);
    //     console.log(employeeData)
    //     const newEmpData = plainToClass(Employee, {
    //         name: employeeData.name,
    //         departmentId: employeeData.departmentId
    //     })
    //     return await employeeRepo.create(employeeData).save();
    // }
    public async saveEmployeeDetails(employeeDetails: Employee) {
        console.log(employeeDetails);
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }

    // Add in EmpoyeeRepository.ts

    public async getEmployeeByName(name: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name },
        });
        return employeeDetail;
    }
}