export interface CartProduct {
    productId: string;
    quantity: number;
}

export interface Cart {
    _id: string;
    userId: string;
    products: CartProduct[];
}
