import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule, 
    AuthModule, 
    ConfigModule.forRoot({isGlobal:true}), 
    MongooseModule.forRootAsync({ // Use forRootAsync to asynchronously load the Mongoose module options
      imports: [ConfigModule], // Import ConfigModule to use ConfigService
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // Use ConfigService to access the MONGODB_URI environment variable
        useNewUrlParser: true,
      }),
      inject: [ConfigService], // Inject ConfigService into the factory function
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
