export class Product {
    product_id: number;
    name: string;
    color: string;
    size: string;
    quantity: number;
    gender: string;
    price: number;
    available: string;
    namee: string;
    image: string;
    description: string;

    constructor(productId: number, name: string, color: string, size: string, quantity: number, gender: string, price: number, available: string, subcategory: string, image: string, description: string) {
        this.product_id = productId
        this.name = name
        this.color = color
        this.size = size
        this.quantity = quantity
        this.gender = gender
        this.price = price
        this.available = available
        this.namee = subcategory
        this.image = image
        this.description = description
    }
}