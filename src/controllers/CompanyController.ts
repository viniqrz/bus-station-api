import { NextFunction, Response } from "express";
import { ICompanyService } from "../services/CompanyService";
import { Inject, Service } from "typedi";
import { IRequest } from "../@types/express/request";

@Service("CompanyController")
export class CompanyController {
  constructor(
    @Inject("CompanyService") private companyService: ICompanyService
  ) {}

  public async create(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { company } = req.body;

      const savedCompany = await this.companyService.create(company);

      res.status(200).json({
        status: "success",
        data: {
          company: savedCompany,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public async getAll(req: IRequest, res: Response, next: NextFunction) {
    try {
      const companies = await this.companyService.getAll();

      res.status(200).json({
        status: "success",
        data: companies,
      });
    } catch (err) {
      next(err);
    }
  }

  public async getById(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { companyId } = req.params;

      const company = await this.companyService.getById(Number(companyId));

      res.status(200).json({
        status: "success",
        data: {
          company,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public async update(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { companyId } = req.params;

      const {
        company: { name },
      } = req.body;

      const company = await this.companyService.update(Number(companyId), name);

      res.status(200).json({
        status: "success",
        data: {
          company,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  public async delete(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { companyId } = req.params;

      const company = await this.companyService.delete(Number(companyId));

      res.status(200).json({
        status: "success",
        data: {
          company,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
