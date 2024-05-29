//import { Types } from 'mongoose';

export interface CartProduct {
    productId: any; //ObjectId de mongoDB -> Types.ObjectId
    quantity: number;
}

export interface Cart {
    _id: string;
    userId: any; //ObjectId de mongoDB -> Types.ObjectId
    products: CartProduct[];
}
