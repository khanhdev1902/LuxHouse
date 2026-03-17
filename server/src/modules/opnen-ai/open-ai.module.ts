import { Module } from '@nestjs/common';
import { OpenAiController } from './open-ai.controller';
import { OpenAiService } from './open-ai.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [OpenAiController],
  providers: [OpenAiService, PrismaService],
})
export class OpenAiModule {}
