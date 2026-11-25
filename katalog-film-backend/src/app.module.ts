import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { FilmModule } from './film/film.module';

@Module({
  imports: [PrismaModule, FilmModule],
})
export class AppModule {}