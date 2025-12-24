import { createCanvas } from 'canvas';
import JsBarcode from 'jsbarcode';

export interface BarcodePayload {
    orderId: string;
    variants: Array<{
        id: string;
        name: string;
    }>;
}

export async function generateBarcode(payload: BarcodePayload): Promise<Buffer> {
    const canvas = createCanvas(400, 150);
    const data = JSON.stringify(payload);

    JsBarcode(canvas, data, {
        format: 'CODE128',
        displayValue: true,
        fontSize: 12,
        margin: 10,
    });

    return canvas.toBuffer('image/png');
}
