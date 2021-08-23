import { AppConfig } from "./shared/app.config";
import { entities } from "./shared/app.imports";

const config = new AppConfig();

let ormConfig;

if (config.database.dbType === "sqlite") {
  ormConfig = {
    type: "sqlite",
    database: config.database.sqlite.name,
    entities,
    migrations: ["dist/migrations/*.js"],
    cli: {
      migrationsDir: "src/migrations",
    },
  };
} else if (config.database.dbType === "mysql") {
  ormConfig = {
    type: "mysql",
    replication: {
      master: {
        host: config.database.mySql.host,
        port: config.database.mySql.port,
        username: config.database.mySql.userName,
        password: config.database.mySql.password,
        database: config.database.mySql.name,
      },
      slaves: [
        {
          host: config.database.mySql.replication.host,
          port: config.database.mySql.replication.port,
          username: config.database.mySql.userName,
          password: config.database.mySql.password,
          database: config.database.mySql.name,
        },
      ],
    },
    entities,
    migrations: ["src/migrations/*.ts"],
    cli: {
      migrationsDir: "src/migrations",
    },
  };
}

module.exports = ormConfig;
