import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import axios from 'axios';

@Injectable()
export class OrdersService {
  constructor(private readonly configService: ConfigService) {}

  async getLastOrders() {
    const now = moment().toDate();
    const oneHourAgo = moment().subtract(1, 'hour').toDate();

    const baseUrl = this.configService.get<string>('ORDER_DESK_URL');
    const apiKey = this.configService.get<string>('ORDERDESK-API-KEY');
    const storeId = this.configService.get<string>('ORDERDESK-STORE-ID');

    const orders = await axios.get(`${baseUrl}/api/v2/orders`, {
      headers: {
        'ORDERDESK-API-KEY': apiKey,
        'ORDERDESK-STORE-ID': storeId,
      },
      params: {
        search_start_date: oneHourAgo,
        search_end_date: now,
      },
    });
    orders.data.orders = orders.data.orders.map((item: any) => ({
      id: item.id,
      address: item.customer.address1,
    }));

    return orders.data;
  }
}
