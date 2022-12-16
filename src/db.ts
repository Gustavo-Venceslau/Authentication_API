import { Pool } from 'pg';

const connectionString = 'postgres://ndkhlpbh:FF35lT-za8q-5_ba2cReLuAfMVplmUYv@mahmud.db.elephantsql.com/ndkhlpbh';

const db = new Pool({ connectionString });

export default db;