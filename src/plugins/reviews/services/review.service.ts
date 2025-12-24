import { Injectable } from '@nestjs/common';
import { TransactionalConnection, RequestContext, ID } from '@vendure/core';
import { ProductReview } from '../entities/product-review.entity';

@Injectable()
export class ReviewsService {
    constructor(private connection: TransactionalConnection) {}

    async findByProductId(ctx: RequestContext, productId: ID): Promise<ProductReview[]> {
        return this.connection.getRepository(ctx, ProductReview).find({
            where: { productId },
            relations: ['product'],
        });
    }

    async getAverageRating(ctx: RequestContext, productId: ID): Promise<number> {
        const reviews = await this.connection.getRepository(ctx, ProductReview).find({
            where: { productId },
        });

        if (reviews.length === 0) return 0;

        const total = reviews.reduce((sum, r) => sum + r.rating, 0);
        return total / reviews.length;
    }
}
