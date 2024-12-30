import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IpPipeService } from './ip-pipe/ip-pipe.service';
import { env } from 'process';

// check if the environment variable is set
if (!env.CORS_ORIGIN) {
  console.error('Missing CORS_ORIGIN environment variable');
  process.exit(1);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: env.CORS_ORIGIN,
    methods: 'GET',
    credentials: true,
  });

  await app.listen(3000);

  const ipPipeService = app.get(IpPipeService);
  ipPipeService.getIps();
  
}
bootstrap();
