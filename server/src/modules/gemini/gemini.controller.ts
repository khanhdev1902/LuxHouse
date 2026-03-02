import { Controller, Post, Body } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('chat')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post()
  async chat(@Body('content') content: string) {
    const reply = await this.geminiService.sendMessage(content);
    return reply;
  }
}
