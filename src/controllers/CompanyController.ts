import { NextFunction, Response } from "express";
import { ICompanyService } from "../services/CompanyService";
import { Inject, Service } from "typedi";
import { IRequest } from "../@types/express/request";

@Service("CompanyController")
export class CompanyController {
  constructor(
    @Inject("CompanyService") private companyService: ICompanyService
  ) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(req: IRequest, res: Response, next: NextFunction) {
    try {
      const company = req.body;

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
      const { id } = req.params;

      const company = await this.companyService.getById(Number(id));

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
      const { id } = req.params;

      const name = req.body.name;

      const company = await this.companyService.update(Number(id), name);

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
      const { id } = req.params;

      const company = await this.companyService.delete(Number(id));

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
