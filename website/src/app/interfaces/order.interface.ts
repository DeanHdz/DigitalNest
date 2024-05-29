//import { Types } from 'mongoose';

export interface OrderProduct {
    productId: any; // Types.ObjectId
    quantity: number;
}

export interface Order {
    _id: string;
    userId: any; // Types.ObjectId
    products: OrderProduct[];
    totalPrice: number;
    shippingAddress: string;
    status: string;
}