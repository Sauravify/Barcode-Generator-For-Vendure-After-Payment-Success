import { Asset, PluginCommonModule, VendurePlugin } from '@vendure/core';
import { OrderBarcodeResolver } from './resolvers/order-barcode.resolver';
import { PaymentSuccessResolver } from './resolvers/payment-success.resolver';

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [PaymentSuccessResolver, OrderBarcodeResolver],
    entities: [],
    configuration: config => {
        if (!config.customFields.Order.some(f => f.name === 'barcode')) {
            config.customFields.Order.push({
                name: 'barcode',
                type: 'relation',
                entity: Asset,
                nullable: true,
                public: true,
            });
        }
        return config;
    },
})
export class OrderPlugin {}
