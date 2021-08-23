import { Module } from "@nestjs/common";
import { AuthenticationModule } from "./controllers/authentication/authentication.module";
import { ConfigModule } from "@nestjs/config";
import { appDir } from "./root";
import { AppConfig } from "./shared/app.config";
import { AppImports } from "./shared/app.imports";
import { UserModule } from "./controllers/user/user.module";

@Module({
  imports: [AuthenticationModule, UserModule, ...AppImports],
  controllers: [],
  providers: [],
})
export class AppModule {}
