import { createDatasource, ds_env } from "../lib/datasources";

export default createDatasource({
  provider: "postgresql",
  url: ds_env("DATABASE_URL"),
});
