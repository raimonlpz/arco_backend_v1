import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { SearchModule } from './search/search.module';
import { ProfileModule } from './profile/profile.module';
import { FollowModule } from './follows/follow.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    SearchModule,
    PrismaModule,
    ProfileModule,
    FollowModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
