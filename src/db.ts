import { Pool } from 'pg';

const connectionString = 'i remove the connection for security';

const db = new Pool({ connectionString });

export default db;
