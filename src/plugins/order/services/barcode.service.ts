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
    const canvas = createCanvas(200, 80);
    const data = JSON.stringify(payload);

    JsBarcode(canvas, data, {
        format: 'CODE128',
        displayValue: true,
        fontSize: 10,
        margin: 5,
        width: 2,
        height: 40,
    });

    return canvas.toBuffer('image/png');
}
