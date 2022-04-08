import { EntityRepository, Repository } from "typeorm";
import { Vacations } from "../../database/entities/Vacations";

@EntityRepository(Vacations)
class VacationRespository extends Repository<Vacations>{}

export { VacationRespository };
