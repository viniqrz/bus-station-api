import { Inject, Service } from "typedi";
import { ICompanyRepository } from "../repositories/CompanyRepository";
import { Company } from "../models/CompanyEntity";

interface ICompanyService {
  get(id: number): Promise<Company>;
}

@Service("CompanyService")
export class CompanyService implements ICompanyService {
  constructor(
    @Inject("CompanyRepository") private companyRepository: ICompanyRepository
  ) {}

  public async get(id: number): Promise<Company> {
    return await this.companyRepository.findById(id);
  }
}
