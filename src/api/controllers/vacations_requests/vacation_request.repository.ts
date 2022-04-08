import { EntityRepository, Repository } from "typeorm";
import { VacationsRequests } from "../../../database/entities/VacationsRequests";

@EntityRepository(VacationsRequests)
class VacationRequestRepository extends Repository<VacationsRequests>{}

export { VacationRequestRepository };