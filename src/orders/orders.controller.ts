import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async getNewOrders() {
    const orders = await this.orderService.getLastOrders();

    console.log(orders);
  }
}
