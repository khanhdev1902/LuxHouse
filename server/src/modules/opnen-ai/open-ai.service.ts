/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { historyInterface } from './open-ai.interface';
import { PrismaService } from 'src/prisma.service';
import { productListSelect } from '../products/product.select';

@Injectable()
export class OpenAiService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prisma: PrismaService,
  ) {}

  private apiKey = process.env.OPENROUTER_API_KEY;

  private models = [
    'stepfun/step-3.5-flash:free',
    'arcee-ai/trinity-large-preview:free',
    'lfm2-1.2b-thinking:free',
    'lfm2-1.2b-instruct:free',
  ];

  async sendMessage(sessionId: string, content: string) {
    const key = `chat_history:${sessionId}`;

    const historyRaw = await this.cacheManager.get(key);
    let history: historyInterface = historyRaw
      ? (historyRaw as historyInterface)
      : [];

    history.push({
      role: 'user',
      content,
    });
    const systemPrompt = await this.systemPrompt();

    for (const model of this.models) {
      try {
        const res = await axios.post(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            model: model,
            temperature: 0.4,
            max_tokens: 500,
            messages: [
              {
                role: 'system',
                content: systemPrompt,
              },
              ...history.slice(-8),
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
          },
        );

        const reply =
          res.data?.choices?.[0]?.message?.content ||
          'Xin lỗi, tôi gặp lỗi khi xử lý, vui lòng thử lại !';

        history.push({
          role: 'assistant',
          content: reply,
        });

        history = history.slice(-20);

        const caching = await this.cacheManager.set(
          key,
          history,
          1 * 1 * 60 * 60 * 1000, // day- hour - mi - sec - mili
        );
        console.log({ key }, caching);

        return {
          role: 'assistant',
          model,
          // history,
          content: reply,
        };
      } catch (e) {
        console.log({ 'Model failed:': model, e });
      }
    }

    throw new Error('All models failed');
  }

  async getHistory(sessionId: string) {
    const key = `chat_history:${sessionId}`;
    const history = await this.cacheManager.get(key);
    return history || [];
  }

  async clearHistory(sessionId: string) {
    const key = `chat_history:${sessionId}`;
    await this.cacheManager.del(key);
    return 'clear success';
  }

  async systemPrompt() {
    const cacheKey = 'system_prompt';
    const cached = await this.cacheManager.get<string>(cacheKey);
    if (cached) return cached;

    const categories = await this.prisma.category.findMany({
      where: {
        products: {
          some: {}, // có ít nhất 1 product
        },
      },
      take: 5,
      orderBy: {
        name: 'asc',
      },
    });
    console.log(categories);

    const products = await this.prisma.product.findMany({
      where: {
        categories: {
          some: {
            categoryId: {
              in: categories.map((c) => c.id),
            },
          },
        },
      },
      select: {
        ...productListSelect,
        categories: {
          select: { categoryId: true },
        },
      },
    });

    //create map categoryId -> products[]
    const categoryMap = new Map<number, typeof products>();

    for (const c of categories) {
      categoryMap.set(c.id, []);
    }

    //Group products vào category
    for (const p of products) {
      for (const c of p.categories) {
        if (categoryMap.has(c.categoryId)) {
          categoryMap.get(c.categoryId)!.push(p);
        }
      }
    }

    //Build text
    let productText = '';

    for (const category of categories) {
      const list = categoryMap.get(category.id) || [];

      if (list.length === 0) continue;

      productText += `\n${category.name}:\n`;

      productText += list
        .slice(0, 2)
        .map((p) => {
          const v = p.variants.find((v) => v.defaultVariant);

          if (!v) return `- ${p.name} (chưa có giá)`;

          const price = Number(v.price);
          const discountValue = Number(v.discounts?.[0]?.discount?.value || 0);

          const discountPrice = price - price * (discountValue / 100);

          const priceText =
            discountValue > 0
              ? `Giá gốc: ${price}đ - Giá KM: ${discountPrice}đ (-${discountValue}%)`
              : `Giá: ${price}đ`;

          return `- ${p.name} – ${priceText}`;
        })
        .join('\n');

      productText += '\n';
    }

    const result = `
     Bạn là chatbot chăm sóc khách hàng của LuxHouse.
      LuxHouse là website chuyên bán nội thất và đồ trang trí nhà cửa cao cấp.
      Danh mục & sản phẩm tiêu biểu:
      ${productText}

      Nhiệm vụ của bạn:
      - Trả lời câu hỏi về sản phẩm dựa trên dữ liệu được cung cấp
      - Tư vấn sản phẩm phù hợp với nhu cầu khách hàng
      - Gợi ý thêm sản phẩm liên quan nếu hợp lý
      - Nếu không có thông tin → nói "Hiện tại LuxHouse chưa có thông tin về sản phẩm này"

      Quy tắc:
      - CHỈ sử dụng thông tin trong danh sách sản phẩm
      - KHÔNG tự bịa giá, thông số, khuyến mãi
      - Nếu khách hỏi ngoài dữ liệu → trả lời lịch sự + gợi ý sản phẩm gần nhất

      Tư vấn:
      - Nếu khách chưa rõ nhu cầu → hỏi lại 1–2 câu (ví dụ: ngân sách, diện tích, mục đích)
      - Nếu có nhiều lựa chọn → liệt kê ngắn gọn theo bullet

      Phong cách:
      - Ngắn gọn
      - Dễ hiểu
      - Xuống dòng khi liệt kê
      - Không viết dài dòng

      Format trả lời:
      - Nếu có sản phẩm → liệt kê dạng:
        + Tên sản phẩm – Giá
      - Nếu tư vấn → thêm 1 câu gợi ý cuối
      `;
    await this.cacheManager.set(
      cacheKey,
      result,
      1000 * 60 * 60, // 1 tiếng
    );

    return result;
  }
}
