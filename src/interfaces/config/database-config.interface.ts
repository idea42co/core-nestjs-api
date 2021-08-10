export interface DatabaseConfigInterface {
  dbType: string;
  syncronize: boolean;
  sqlite: {
    name: string;
  };
  mySql: {
    host: string;
    port: number;
    name: string;
    userName: string;
    password: string;
    replication: {
      host: string;
      port: number;
    };
  };
}
