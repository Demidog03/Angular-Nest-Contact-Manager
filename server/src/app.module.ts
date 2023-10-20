import 'dotenv/config'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import * as process from 'process'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ContactsModule } from './contacts/contacts.module'
import * as path from 'path'
import { User } from './users/users.model'
import { Contact } from './contacts/contacts.model'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRESQL_HOST,
      port: +process.env.POSTGRESQL_PORT,
      username: process.env.POSTGRESQL_USERNAME,
      password: process.env.POSTGRESQL_PASSWORD,
      database: process.env.POSTGRESQL_DB,
      models: [User, Contact],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'public/profiles'),
      serveRoot: '/profiles',
    }),
    ContactsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
