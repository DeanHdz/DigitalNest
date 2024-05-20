//import { Types } from 'mongoose';

export interface CartProduct {
    productId: any; //ObjectId de mongoDB -> Types.ObjectId
    quantity: number;
}

export interface Cart {
    userId: any; //ObjectId de mongoDB -> Types.ObjectId
    products: CartProduct[];
}
