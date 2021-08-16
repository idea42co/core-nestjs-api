import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./controllers/authentication/authentication.module";
import { ConfigModule } from "@nestjs/config";
import { appDir } from "./root";
import { AppConfig } from "./app.config";
import { AppImports } from "./app.imports";
import { TestModule } from "./controllers/test/test.module";

@Module({
  imports: [AuthenticationModule, TestModule, ...AppImports],
  controllers: [],
  providers: [],
})
export class AppModule {}
