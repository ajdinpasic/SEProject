

export class Cart {
    date_added: Date
    date_updated: Date
    quantity: number


    constructor(date_added: Date, date_updated: Date, quantity: number) {
        this.date_added = date_added
        this.date_updated = date_updated
        this.quantity = quantity
    }
}