import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Asset, AssetService, Ctx, Order, RequestContext } from '@vendure/core';

export interface OrderCustomFields {
    barcode?: Asset;
}

@Resolver(() => Order)
export class OrderBarcodeResolver {
    constructor(private assetService: AssetService) {}

    @ResolveField(() => Asset, { nullable: true })
    async barcode(
        @Ctx() ctx: RequestContext,
        @Parent() order: Order & { customFields: OrderCustomFields },
    ): Promise<Asset | null> {
        const assetId = order.customFields?.barcode?.id;
        if (!assetId) {
            return null;
        }

        const asset = await this.assetService.findOne(ctx, assetId);
        return asset || null;
    }
}
