import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';

@Controller('open-ai')
export class OpenAiController {
  constructor(private openAiService: OpenAiService) {}

  @Post()
  sendOpenAi(@Body() req: { sessionId: string; content: string }) {
    return this.openAiService.sendMessage(req.sessionId, req.content);
  }

  @Get(':sessionId')
  getHistory(@Param('sessionId') sessionId: string) {
    return this.openAiService.getHistory(sessionId);
    // return this.openAiService.systemPrompt();
  }

  @Delete(':sessionId')
  clearHistory(@Param('sessionId') sessionId: string) {
    return this.openAiService.clearHistory(sessionId);
  }
}
