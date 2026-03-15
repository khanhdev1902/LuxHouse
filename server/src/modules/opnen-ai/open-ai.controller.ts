import { Body, Controller, Post } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';

@Controller('open-ai')
export class OpenAiController {
  constructor(private openAiService: OpenAiService) {}
  @Post()
  sendOpenAi(@Body() req: { content: string }) {
    return this.openAiService.sendMessage(req.content);
  }
}
