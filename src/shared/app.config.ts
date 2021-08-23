import { DatabaseConfigInterface } from "./interfaces/config/database-config.interface";
import { JwtConfigInterface } from "./interfaces/config/jwt-config.interface";
import * as dotenv from "dotenv";
import { appDir } from "../root";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppConfig {
  constructor() {
    dotenv.config({
      path: `${appDir}/src/env/${process.env.NODE_ENV || "localhost"}.env`,
    });
  }

  get database(): DatabaseConfigInterface {
    return {
      dbType: process.env.DB_TYPE,
      syncronize: process.env.DB_SYNCRONIZE
        ? process.env.DB_SYNCRONIZE === "true"
        : true,

      mySql: {
        host: process.env.MYSQL_DB_HOST,
        port: parseInt(process.env.MYSQL_DB_PORT || "3306", 10),
        name: process.env.MYSQL_DB_NAME,
        userName: process.env.MYSQL_DB_USERNAME,
        password: process.env.MYSQL_DB_PASSWORD,
        replication: {
          host: process.env.MYSQL_RO_DB_HOST,
          port: parseInt(process.env.MYSQL_RO_DB_PORT || "3306", 10),
        },
      },

      msSql: {
        host: process.env.MSSQL_DB_HOST,
        port: parseInt(process.env.MSSQL_DB_PORT || "1433", 10),
        database: process.env.MSSQL_DB_NAME,
        userName: process.env.MSSQL_DB_USERNAME,
        password: process.env.MSSQL_DB_PASSWORD,
      },

      sqlite: {
        name: process.env.SQLITE_DB_NAME,
      },
    };
  }
  get jwt(): JwtConfigInterface {
    return {
      secret: process.env.JWT_SECRET,
      expiresInSeconds: parseInt(
        process.env.JWT_EXPIRES_IN_SECONDS || "3600",
        10,
      ),
    };
  }
}
