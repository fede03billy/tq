import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule, MongooseModule.forRoot('mongodb+srv://federico:0dxwJWBlSR8572KJ@clustertq.mqucwlc.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true})], // TODO: get the connection string from .env
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
