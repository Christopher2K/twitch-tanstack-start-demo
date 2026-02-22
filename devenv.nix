{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:
let
  postgresUser = "postgres";
  postgresPassword = "password";
  postgresDatabase = "demo-ts-start";
in
{
  env.DATABASE_URL = "postgres://${postgresUser}:${postgresPassword}@localhost:5432/${postgresDatabase}";
  env.SESSION_SECRET = "11cdac011e169c8dc7469f76bf0f044d7e9b75f78b6fd3be61e4d9893ca4e5dd";
  env.NODE_ENV = "development";

  services = {
    postgres = {
      enable = true;
      package = pkgs.postgresql_18;
      listen_addresses = "*";
      initialDatabases = [
        {
          name = postgresDatabase;
          pass = postgresPassword;
          user = postgresUser;
        }
      ];
    };
  };

  processes."dev".exec = "pnpm dev";
}
