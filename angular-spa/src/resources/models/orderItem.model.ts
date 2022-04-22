import { Guid } from "guid-typescript"

export class OrderItem {
    orderId: Guid
    product: number;
    quantity: number;

    constructor(orderId: Guid, product: number, quantity: number) {
        this.orderId = orderId
        this.product = product
        this.quantity = quantity
    }
}