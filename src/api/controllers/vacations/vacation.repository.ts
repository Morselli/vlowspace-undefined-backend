import { EntityRepository, Repository } from "typeorm";
import { Vacations } from "../../../database/entities/Vacations";

@EntityRepository(Vacations)
class VacationRepository extends Repository<Vacations>{}

export { VacationRepository };
