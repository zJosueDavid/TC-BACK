import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  // console.log(process.env);
  console.log(process.env.DB_USER);
  console.log(process.env.DB_NAME);
  console.log(process.env.DB_PASSWORD);
  

  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilita CORS con configuración por defecto

  // O, si necesitas configuraciones específicas
  app.enableCors({
    origin: '*', // Reemplaza con el dominio de tu front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });


  await app.listen(3000);
}
bootstrap();
