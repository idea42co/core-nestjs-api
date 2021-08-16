import {
  DynamicModule,
  ForwardReference,
  Provider,
  Type,
} from "@nestjs/common";
import { AppConfig } from "./app.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./models/database/user.entity";
import { ScopeEntity } from "./models/database/scope.entity";
import { OrganizationEntity } from "./models/database/organization.entity";
import { appDir } from "./root";

const config = new AppConfig();

const AppImports: (
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference<any>
)[] = [];

// eslint-disable-next-line @typescript-eslint/ban-types
const entities: Array<any> = [UserEntity, ScopeEntity, OrganizationEntity];

if (config.database.dbType === "sqlite") {
  AppImports.push(
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: config.database.sqlite.name,
      entities,
      synchronize: config.database.syncronize,
      migrations: [`${appDir}/dist/migrations/*.js`],
      migrationsRun: true,
    }),
  );
} else if (config.database.dbType === "mysql") {
  AppImports.push(
    TypeOrmModule.forRoot({
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
      synchronize: config.database.syncronize,
      migrations: [`${appDir}/dist/migrations/*.js`],
      migrationsRun: true,
    }),
  );
}

export { AppImports, entities };
