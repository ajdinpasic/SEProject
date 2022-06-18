import { Product } from "src/resources/models/product.model"

export class CartAddedUtil {
    products: Product[]
    count: number


    constructor(products: Product[], count: number) {
        this.products = products
        this.count = count
    }
}