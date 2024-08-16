import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleadosModule } from './empleados/empleados.module';
import { InventariosModule } from './inventarios/inventarios.module';
import {AsistenciasModule} from './asistencias/asistencias.module'
import { AdelantoSueldoModule } from './sueldos/adelanta_sueldo.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // Usar synchronize en desarrollo, desactivar en producción
      namingStrategy: new SnakeNamingStrategy(), // Estrategia de naming snake_case
    }),
    EmpleadosModule,
    InventariosModule,
    AsistenciasModule,
    AdelantoSueldoModule,
    UsersModule,
    AuthModule,
    ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
