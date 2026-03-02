import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  async sendMessage(content: string) {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });

    const result = await model.generateContent(content);
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const response = await result.response;

    return {
      sender: 'Gemini',
      content: response.text(),
    };
  }
}
