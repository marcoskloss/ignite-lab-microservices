import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { ProductsService } from 'src/services/products.service';

import { PurchasesService } from 'src/services/purchases.service';
import { Purchase } from '../models/Purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Purchase])
  async purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField()
  async product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }
}
