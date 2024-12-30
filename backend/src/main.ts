import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IpPipeService } from './ip-pipe/ip-pipe.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const ipPipeService = app.get(IpPipeService);
  const getIps = ipPipeService.getIps();

}
bootstrap();
