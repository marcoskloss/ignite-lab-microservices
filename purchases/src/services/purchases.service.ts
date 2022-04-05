import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

type CreatePurchaseParams = {
  productId: string;
  customerId: string;
};
@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  async listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async listPurchasesByCustomerId(customerId: string) {
    return this.prisma.purchase.findMany({
      where: { customerId },
    });
  }

  async createPurchase({ productId, customerId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found.');
    }

    return this.prisma.purchase.create({
      data: { customerId, productId },
    });
  }
}
