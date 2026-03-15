/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenAiService {
  private apiKey = process.env.OPENROUTER_API_KEY;

  private models = [
    'stepfun/step-3.5-flash:free',
    'arcee-ai/trinity-large-preview:free',
    'lfm2-1.2b-thinking:free',
    'lfm2-1.2b-instruct:free',
  ];

  private history: any[] = [];

  private systemPrompt = `
Bạn là chatbot chăm sóc khách hàng của LuxHouse.

LuxHouse là website chuyên bán nội thất và đồ trang trí nhà cửa cao cấp.

Các sản phẩm chính của LuxHouse gồm:
- Sofa phòng khách
- Bàn ghế ăn
- Giường ngủ
- Tủ quần áo
- Bàn làm việc
- Kệ TV
- Đèn trang trí
- Đồ decor nội thất

LuxHouse hiện có sản phẩm giường ngủ bạn có thể tham khảo:
1. Giường Ngủ Bọc Vải Cao Cấp BOND
Các lựa chọn:
- Size 1m6 – màu xám – giá khoảng 17.490.000đ
- Size 1m8 – màu xám – giá khoảng 18.990.000đ

Đây là mẫu giường bọc vải cao cấp với thiết kế hiện đại, rất phù hợp cho phòng ngủ sang trọng.
Bạn đang tìm giường cho phòng khoảng bao nhiêu m2 để mình tư vấn size phù hợp?

Nhiệm vụ của bạn:
- Trả lời câu hỏi của khách hàng về sản phẩm nội thất
- Tư vấn sản phẩm phù hợp với nhu cầu khách hàng
- Giới thiệu sản phẩm ngắn gọn, dễ hiểu
- Luôn giữ thái độ thân thiện và chuyên nghiệp
- Nếu khách hỏi ngoài lĩnh vực nội thất, hãy lịch sự nói rằng bạn chỉ hỗ trợ về sản phẩm nội thất của LuxHouse

Phong cách trả lời:
- Ngắn gọn
- Dễ hiểu
- Khi liệt kê hãy xuống dòng
- Không nói quá dài
- Không bịa thông tin sản phẩm nếu không chắc chắn
`;

  async sendMessage(content: string) {
    this.history.push({
      role: 'user',
      content,
    });

    for (const model of this.models) {
      try {
        const res = await axios.post(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            model: model,
            temperature: 0.4,
            max_tokens: 400,
            messages: [
              {
                role: 'system',
                content: this.systemPrompt,
              },
              ...this.history.slice(-8),
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
          },
        );

        const reply = res.data.choices[0].message.content;

        this.history.push({
          role: 'assistant',
          content: reply,
        });

        return {
          sender: model,
          content: reply,
        };
      } catch (e) {
        console.log('Model failed:', model);
      }
    }

    throw new Error('All models failed');
  }
}
