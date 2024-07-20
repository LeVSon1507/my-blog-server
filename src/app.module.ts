import { Module } from '@nestjs/common';
import { BlogModule } from './blogs/blog.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './database/database.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig()),
    BlogModule,
    AuthModule,
    DatabaseModule,
  ],
})
export class AppModule {}
