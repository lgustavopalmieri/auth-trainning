import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ResetModule } from './modules/reset/reset.module';
import getConfig from './config';

const config = getConfig();

const DATABASE_SETUP = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    ...(config.database as TypeOrmModuleOptions),
    entities: ['dist/src/modules/**/entities/**.entity{.ts,.js}'],
    migrations: ['dist/src/database/migrations/**/*{.ts,.js}'],
    migrationsTableName: 'migrations_auth-api',
    migrationsRun: true,
    synchronize: false,
  }),
];

@Module({
  imports: [...DATABASE_SETUP, UserModule, ResetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
