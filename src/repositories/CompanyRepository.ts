import { Company } from "models/CompanyEntity";
import { EntityRepository, Repository } from "typeorm";

export interface ICompanyRepository {
  findById(id: number): Promise<Company>;
  find(): Promise<Company[]>;
  save(company: Company): Promise<Company>;
  remove(company: Company): Promise<Company>;
}

@EntityRepository(Company)
export class CompanyRepository
  extends Repository<Company>
  implements ICompanyRepository
{
  public async findById(id: number): Promise<Company> {
    return await this.findOne(id);
  }
}
