const env = {
  localhost: {
    type: 'postgres',
    host: '172.24.0.2',
    port: 5432,
    username: 'auth-api-user',
    password: 'auth',
    database: 'auth-api-database',
  },
};

const cli = {
  migrationsDir: 'src/database/migrations',
  entitiesDir: 'src',
};

module.exports = {
  cli,
  entities: ['dist/src/modules/**/*.entity.js'],
  migrations: ['dist/src/database/migrations/**/*.js'],
  migrationsTableName: 'migrations_auth-api',
  synchronize: false,
  ...(env[process.env.NODE_ENV] || {}),
};
