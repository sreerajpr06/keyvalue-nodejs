import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
import authorize from "../middleware/authorizeMiddleware";

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getAllDepartments);
    this.router.post(`${this.path}`, validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body), this.createDepartment);
    this.router.put(`${this.path}`, validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body), this.updateDepartment);
  }
  private getAllDepartments = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      response.send(await this.departmentService.getAllDepartments());
    } catch (error) {
      return next(error);
    }
  }

  private createDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      // console.log(request.body.address);
      // console.log(addrData)
      const data = await this.departmentService.createDepartment(request.body);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
    } catch (error) {
      return next(error);
    }
  }

  private updateDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      // console.log(request.body.address);
      // console.log(addrData)
      const data = await this.departmentService.updateDepartment(request.body);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
    } catch (error) {
      return next(error);
    }
  }
}

export default DepartmentController;
