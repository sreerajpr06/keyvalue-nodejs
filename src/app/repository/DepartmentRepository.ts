import { getConnection, ObjectLiteral } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRepository{
    async getAllDepartments(){
        const departmentRepo = getConnection().getRepository(Department);
        return await departmentRepo.find();
    }

    public async saveDepartmentDetails(department: ObjectLiteral) {
        console.log(department);
        const deptRepo = getConnection().getRepository(Department);
        return deptRepo.save(department);
    }

    public async updateDepartment(newDepartment: ObjectLiteral) {
        console.log(newDepartment);
        const deptRepo = getConnection().getRepository(Department);
        const oldDept = await deptRepo.findOne(newDepartment.id);
        oldDept.name = newDepartment.name;
        const updatedDept = await deptRepo.save(oldDept);
        return updatedDept;
    }

    public async deleteDepartment(deptId: string) {
        const deptRepo = getConnection().getRepository(Department);
        return deptRepo.softDelete(deptId);
    }
}