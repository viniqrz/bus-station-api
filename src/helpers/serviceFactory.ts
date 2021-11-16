import { Container } from "typedi";

import { CompanyRepository } from "repositories/CompanyRepository";
import { CompanyService } from "services/CompanyService";

export const serviceFactory = {
  company(): CompanyService {
    const companyRepository =
      Container.get<CompanyRepository>("CompanyRepository");

    const companyService = new CompanyService(companyRepository);

    return companyService;
  },
};
