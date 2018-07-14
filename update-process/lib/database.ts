// import RDS connection info for PostgreSQL client
import { pool } from "./connection";

export function query(query: string): void {
  pool.connect((err, client, done) => {
    if (err) {
      throw err;
    }
    client.query(query, [1], (err, res) => {
      done();
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows[0]);
      }
    });
  });
}
