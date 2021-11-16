export interface UserDTO {
  id: number;
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
  companyId?: number;
};
