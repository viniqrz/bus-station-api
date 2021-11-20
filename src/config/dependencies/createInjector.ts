import { getCustomRepository } from "typeorm";
import Container from "typedi";
import { UserRepository } from "../../repositories/UserRepository";

// inicializador de dependências:
// inicializa controllers
import "../../controllers/UserController";
import "../../controllers/CompanyController";
import "../../controllers/TripController";

// inicializa services
import "../../services/UserService";
import "../../services/CompanyService";
import "../../services/TripService";

// inicializa clientes
import "../../infra/http/AxiosHttpClient";
import { CompanyRepository } from "../../repositories/CompanyRepository";
import { TripRepository } from "../../repositories/TripRepository";

const createDependencyInjector = () => {
  Container.set("UserRepository", getCustomRepository(UserRepository));
  Container.set("CompanyRepository", getCustomRepository(CompanyRepository));
  Container.set("TripRepository", getCustomRepository(TripRepository));
};

export default createDependencyInjector;
