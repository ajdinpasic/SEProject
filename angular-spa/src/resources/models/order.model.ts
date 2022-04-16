
import { Guid } from "guid-typescript";

export class Order {
    orderId: Guid
    order_date: Date;
    price: number;
    quantity: number;
    address: string;

    constructor(orderId: Guid, order_date: Date, quantity: number, price: number, address: string) {
        this.orderId = orderId
        this.order_date = order_date
        this.price = price
        this.quantity = quantity
        this.address = address
    }
}