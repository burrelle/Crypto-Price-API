import { Pool } from "pg";

export const pool: Pool = new Pool({
    user: "master",
    host: "cryptoapidb.c9fkn7ooqebi.us-east-2.rds.amazonaws.com",
    database: "crypto-api",
    password: "cryptoapi",
    port: 5432
});