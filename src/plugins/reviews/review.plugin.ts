import { VendurePlugin, PluginCommonModule, LanguageCode } from '@vendure/core';
import { ReviewsResolver } from './resolvers/review.resolver';
import { ProductRatingResolver } from './resolvers/product-rating.resolver';
import { ProductReview } from './entities/product-review.entity';
import { ReviewsService } from './services/review.service';

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [ReviewsService, ReviewsResolver, ProductRatingResolver],
    entities: [ProductReview],
    configuration: config => {
        config.customFields.Product.push({
            name: 'rating',
            type: 'float',
            readonly: true,
            label: [{ languageCode: LanguageCode.en, value: 'Rating' }],
        });
        return config;
    },
})
export class ReviewsPlugin {}
