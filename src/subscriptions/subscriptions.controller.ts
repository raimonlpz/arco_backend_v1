import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { SubscriptionDto } from './dto/subscriptions.dto';
import { SubscriptionsService } from './subscriptions.service';

@UseGuards(JwtGuard)
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @HttpCode(HttpStatus.OK)
  @Post('new')
  addToSubscriptions(@GetUser('id') userId: number, @Body() dto: any) {
    return this.subscriptionsService.addToSubscription(
      userId,
      dto as SubscriptionDto
    );
  }
}
