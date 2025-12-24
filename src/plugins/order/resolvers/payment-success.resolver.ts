import { Injectable, OnModuleInit } from '@nestjs/common';
import {
    AssetService,
    EventBus,
    OrderService,
    PaymentStateTransitionEvent,
    RequestContextService,
} from '@vendure/core';
import { CreateAssetResult } from 'src/codegen/adminTypes';
import { Readable } from 'stream';
import { generateBarcode } from '../services/barcode.service';

@Injectable()
export class PaymentSuccessResolver implements OnModuleInit {
    constructor(
        private eventBus: EventBus,
        private requestContextService: RequestContextService,
        private assetService: AssetService,
        private orderService: OrderService,
    ) {}

    onModuleInit() {
        this.eventBus.ofType(PaymentStateTransitionEvent).subscribe(async event => {
            if (event.toState !== 'Settled') {
                return;
            }

            try {
                const ctx = await this.requestContextService.create({
                    channelOrToken: event.ctx.channel,
                    apiType: 'admin',
                });

                const variants = event.payment.order.lines.map(line => ({
                    id: line.productVariant.id.toString(),
                    name: line.productVariant.name,
                }));

                const payload = {
                    orderId: event.payment.order.id.toString(),
                    variants,
                };

                const barCodeBuffer = await generateBarcode(payload);

                const file = {
                    createReadStream: () => Readable.from(barCodeBuffer),
                    filename: `order-${event.payment.order.id}.png`,
                    mimetype: 'image/png',
                    encoding: '7bit',
                };

                const result: CreateAssetResult = await this.assetService.create(ctx, { file });

                if ('id' in result && result.id) {
                    await this.orderService.updateCustomFields(ctx, event.payment.order.id, {
                        barcodeId: result.id,
                    });
                } else {
                    console.error('Asset creation failed:', result);
                    throw new Error('Failed to create barcode asset');
                }
            } catch (error) {
                console.error('Error in barcode generation process:', error);
                throw new Error('Failed to generate barcode');
            }
        });
    }
}
