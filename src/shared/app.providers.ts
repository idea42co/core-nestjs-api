import { Provider } from "@nestjs/common";
import { AppConfig } from "./app.config";

const AppProviders: Provider<any>[] = [AppConfig];

export { AppProviders };
