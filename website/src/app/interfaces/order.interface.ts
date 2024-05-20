//import { Types } from 'mongoose';

export interface OrderProduct {
    productId: any; // Types.ObjectId
    quantity: number;
}

export interface Order {
    userId: any; // Types.ObjectId
    products: OrderProduct[];
    totalPrice: number;
    status: string;
}