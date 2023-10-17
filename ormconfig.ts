import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'contacts-db',
  synchronize: true,
  logging: true,
  entities: ['dist/src/**/models/*.entity.js'],
  subscribers: [],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
