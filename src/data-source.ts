import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "workspace-backend",
    logging: true,
    entities: ["./src/entity/*.ts"],
    migrations: ["./src/migrations/*.ts"]
})
