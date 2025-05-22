import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";
import { BadRequestException, ValidationPipe } from '@nestjs/common';


async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.setGlobalPrefix("api");

    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          "http://crm:8000",
          "http://localhost:3000",
          "https://crm.uz",
          "https://api/crm.uz",
          "https://crm.vercel.app",
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Not allowad by CORS"));
        }
      },
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, // cookie va header
    });

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT, () => {
      console.log(`Server is started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();