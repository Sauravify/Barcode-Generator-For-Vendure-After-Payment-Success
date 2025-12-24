import { DeepPartial, HasCustomFields, Product, VendureEntity, ID, EntityId } from '@vendure/core';
import { Column, Entity, ManyToOne } from 'typeorm';

export class CustomProductReviewFields {}

@Entity()
export class ProductReview extends VendureEntity implements HasCustomFields {
    constructor(input?: DeepPartial<ProductReview>) {
        super(input);
    }

    @Column(() => CustomProductReviewFields)
    customFields: CustomProductReviewFields;

    @ManyToOne(() => Product)
    product: Product;

    @EntityId()
    productId: ID;

    @Column()
    rating: number;
}
