import { Company } from "../../models/CompanyEntity";

export interface UserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "passenger" | "admin" | "employee";
  companyId?: number;
}

export type UserWithoutPassword = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: "passenger" | "admin" | "employee";
  company: Company;
};
