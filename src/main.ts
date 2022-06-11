import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigOptions } from './config/config';
import generateTypeormConfigFile from './scripts/generate-typeormconfig';
import setDefaultData from './scripts/set-default-data';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  generateTypeormConfigFile(configService);
  await setDefaultData(configService);

  await app.listen(configService.get(ConfigOptions.port));
}
bootstrap();
