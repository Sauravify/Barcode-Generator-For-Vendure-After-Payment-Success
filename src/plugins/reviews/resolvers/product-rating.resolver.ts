import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Ctx, RequestContext, Product } from '@vendure/core';
import { ReviewsService } from '../services/review.service';

@Resolver('Product')
export class ProductRatingResolver {
    constructor(private reviewsService: ReviewsService) {}

    @ResolveField()
    async rating(@Ctx() ctx: RequestContext, @Parent() product: Product) {
        return this.reviewsService.getAverageRating(ctx, product.id);
    }
}
