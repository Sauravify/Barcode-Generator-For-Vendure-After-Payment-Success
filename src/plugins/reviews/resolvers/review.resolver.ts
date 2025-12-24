import { Resolver, Query, Args } from '@nestjs/graphql';
import { Ctx, RequestContext, ID } from '@vendure/core';
import { ProductReview } from '../entities/product-review.entity';
import { ReviewsService } from '../services/review.service';

@Resolver()
export class ReviewsResolver {
    constructor(private reviewsService: ReviewsService) {}

    @Query(() => [ProductReview])
    productReviews(@Ctx() ctx: RequestContext, @Args('productId') productId: ID) {
        return this.reviewsService.findByProductId(ctx, productId);
    }
}
