CREATE EXTENSION IF NO EXISTS "uuid-ossp";
CREATE EXTENSION IF NO EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS aplication_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
)

INSERT INTO aplication_user (username, password) VALUES ('admin', crypt('admin', gen_salt('bf')))