import { Inject, Service } from "typedi";
import { ICompanyRepository } from "../repositories/CompanyRepository";
import { Company } from "../models/CompanyEntity";
import { CompanyDTO } from "../@types/dto/CompanyDto";

export interface ICompanyService {
  getById(id: number): Promise<Company>;
  getAll(): Promise<Company[]>;
  create(companyDto: CompanyDTO): Promise<Company>;
  update(id: number, name: string): Promise<Company>;
  delete(id: number): Promise<Company>;
}

@Service("CompanyService")
export class CompanyService implements ICompanyService {
  constructor(
    @Inject("CompanyRepository") private companyRepository: ICompanyRepository
  ) {}

  public async create(companyDto: CompanyDTO): Promise<Company> {
    const company = this.companyFactory(companyDto);

    return await this.companyRepository.save(company);
  }

  public async getById(id: number): Promise<Company> {
    return await this.companyRepository.findById(id);
  }

  public async getAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  public async update(id: number, name: string): Promise<Company> {
    return await this.companyRepository.save({ id, name } as Company);
  }

  public async delete(id: number): Promise<Company> {
    return await this.companyRepository.remove({ id } as Company);
  }

  private companyFactory(companyDto: CompanyDTO): Company {
    const company = new Company();

    company.name = companyDto.name;

    return company;
  }
}
