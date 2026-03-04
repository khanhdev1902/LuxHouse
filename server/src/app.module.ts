import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalExceptionFilter } from './exceptions/global-exception.filter';
import { ProductModule } from './modules/products/produc.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { CartModule } from './modules/cart/cart.module';
import { GeminiModule } from './modules/gemini/gemini.module';
// import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 10000, // milliseconds
          limit: 20,
        },
      ],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => ({
        stores: [
          new Keyv({
            store: new CacheableMemory({
              ttl: 60000,
              lruSize: 5000,
            }),
            namespace: 'luxhouse-memory-cache',
          }),
          createKeyv(
            (process.env.REDIS_URL as string) || 'redis://localhost:6379',
            { namespace: 'luxhouse' },
          ),
        ],
      }),
    }),
    AuthModule,
    ProductModule,
    CartModule,
    GeminiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
