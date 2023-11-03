CREATE TYPE transaction_type AS ENUM ('Sell', 'Restock');
CREATE TABLE items (
  code varchar(255) primary key,
  name varchar(255) not null,
  image varchar(255) not null,
  qty integer not null,
  price integer not null,
  categories varchar(255)
);
CREATE TABLE transactions (
  item varchar(255) references items (code),
  qty integer not null,
  cust_name varchar not null DEFAULT "",
  cust_phone varchar not null DEFAULT "",
  cust_address varchar not null DEFAULT "",
  type transaction_type not null,
  timestamp timestamp not null CURRENT_TIMESTAMP
)