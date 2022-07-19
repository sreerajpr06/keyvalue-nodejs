import { ObjectLiteral } from "typeorm";
import HttpException from "../exception/HttpException";
import { DepartmentRepository } from "../repository/DepartmentRepository";

export class DepartmentService{
    constructor(private departmentRepo: DepartmentRepository){}
    async getAllDepartments(){
        return await this.departmentRepo.getAllDepartments();
    }

    public async createDepartment(newDept: ObjectLiteral) {
        try {
            const save = await this.departmentRepo.saveDepartmentDetails(newDept);
            return save;
        } catch(err) {
            throw new HttpException(400, "Failed to create new department");
        }
    }

    public async updateDepartment(newDept: ObjectLiteral) {
        const updatedDept = await this.departmentRepo.updateDepartment(newDept);
        return updatedDept;
    }

    public async deleteDepartment(deptId: string) {
        try {
            const delDepartment =  await this.departmentRepo.deleteDepartment(deptId);
            return delDepartment;
        } catch (err) {
            throw new HttpException(400, "Failerd to delete department");
        }
    }    
}