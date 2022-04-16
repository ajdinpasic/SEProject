export class Product {
    productId: number;
    name: string;
    color: string;
    size: string;
    quantity: number;
    gender: string;
    price: number;
    available: string;
    subcategory: string;
    image: string;
    description: string;

    constructor(productId: number, name: string, color: string, size: string, quantity: number, gender: string, price: number, available: string, subcategory: string, image: string, description: string) {
        this.productId = productId
        this.name = name
        this.color = color
        this.size = size
        this.quantity = quantity
        this.gender = gender
        this.price = price
        this.available = available
        this.subcategory = subcategory
        this.image = image
        this.description = description
    }
}