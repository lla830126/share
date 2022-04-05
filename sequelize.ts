import { URL } from "url";
import { join } from "path";
import { Dialect } from "sequelize";

const namespace = "sequelize";

const databaseName = "ah_sequelize";

export const DEFAULT = {
    [namespace]: (config: any) => {

        process.env.DB_DATABASE = "lla_mysql_dev";
        process.env.DB_DIALECT = "mysql"; // mariadb, sqlite, postgres, mssql -> https://sequelize.org/v3/docs/usage/#dialect
        process.env.DB_HOST = "127.0.0.1";
        process.env.DB_PORT = "3306";
        process.env.DB_USER = "root";
        process.env.DB_PASS = "1234";

        let dialect = process.env.DB_DIALECT || "mysql";
        let host = process.env.DB_HOST || "127.0.0.1";
        let port = process.env.DB_PORT || "3306";

        let database =
            process.env.DB_DATABASE ||
            `${databaseName}_${config.process.env}${
                process.env.JEST_WORKER_ID ? "_" + process.env.JEST_WORKER_ID : ""
            }`;

        let username = process.env.DB_USER || undefined;
        let password = process.env.DB_PASS || undefined;

        // if your environment provides database information via a single JDBC-style URL like mysql://username:password@hostname:port/default_schema
        const connectionURL =
            process.env.DATABASE_URL || process.env.MYSQL_URL || process.env.PG_URL;

        if (connectionURL) {
            const parsed = new URL(connectionURL);
            if (parsed.protocol) dialect = parsed.protocol.slice(0, -1);
            if (parsed.username) username = parsed.username;
            if (parsed.password) password = parsed.password;
            if (parsed.hostname) host = parsed.hostname;
            if (parsed.port) port = parsed.port;
            if (parsed.pathname) database = parsed.pathname.substring(1);
        }

        if (dialect === "postgresql") dialect = "postgres";

        return {
            autoMigrate: false,
            logging: false,
            dialect: dialect as Dialect,
            port: parseInt(port),
            database: database,
            host: host,
            username: username,
            password: password,
            models: [join(__dirname, "..", "models")],
            migrations: [join(__dirname, "..", "migrations")],
            migrationLogLevel: "info",
            // you can also pass "dialectOptions", for example if you need `{ssl: true}` for Postgres

            // For Example, if you want to change the schema of a Postgres database away from "public", you would need to include the following configs:
            // schema: schema,
            // searchPath: schema,
            // dialectOptions: { prependSearchPath: true },
        };
    },
};

export const production = {
    [namespace]: (config: any) => {

        process.env.DB_DATABASE = "lla_mysql_dev";
        process.env.DB_DIALECT = "mysql"; // mariadb, sqlite, postgres, mssql -> https://sequelize.org/v3/docs/usage/#dialect
        process.env.DB_HOST = "127.0.0.1";
        process.env.DB_PORT = "3306";
        process.env.DB_USER = "dbuser";
        process.env.DB_PASS = "1234";

        let dialect = process.env.DB_DIALECT || "mysql";
        let host = process.env.DB_HOST || "127.0.0.1";
        let port = process.env.DB_PORT || "3306";

        let database =
            process.env.DB_DATABASE ||
            `${databaseName}_${config.process.env}${
                process.env.JEST_WORKER_ID ? "_" + process.env.JEST_WORKER_ID : ""
            }`;

        let username = process.env.DB_USER || undefined;
        let password = process.env.DB_PASS || undefined;

        // if your environment provides database information via a single JDBC-style URL like mysql://username:password@hostname:port/default_schema
        const connectionURL =
            process.env.DATABASE_URL || process.env.MYSQL_URL || process.env.PG_URL;

        if (connectionURL) {
            const parsed = new URL(connectionURL);
            if (parsed.protocol) dialect = parsed.protocol.slice(0, -1);
            if (parsed.username) username = parsed.username;
            if (parsed.password) password = parsed.password;
            if (parsed.hostname) host = parsed.hostname;
            if (parsed.port) port = parsed.port;
            if (parsed.pathname) database = parsed.pathname.substring(1);
        }

        if (dialect === "postgresql") dialect = "postgres";

        return {
            autoMigrate: true,
            logging: false,
            dialect: dialect as Dialect,
            port: parseInt(port),
            database: database,
            host: host,
            username: username,
            password: password,
            models: [join(__dirname, "..", "models")],
            migrations: [join(__dirname, "..", "migrations")],
            migrationLogLevel: "info",
            // you can also pass "dialectOptions", for example if you need `{ssl: true}` for Postgres

            // For Example, if you want to change the schema of a Postgres database away from "public", you would need to include the following configs:
            // schema: schema,
            // searchPath: schema,
            // dialectOptions: { prependSearchPath: true },
        };
    },
};


// for the sequelize CLI tool
module.exports.development = DEFAULT.sequelize({
    env: "development",
    process: { env: "development" },
});

module.exports.staging = DEFAULT.sequelize({
    env: "staging",
    process: { env: "staging" },
});

module.exports.production = production.sequelize({
    env: "production",
    process: { env: "production" },
});