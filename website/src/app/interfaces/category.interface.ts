//import { Types } from 'mongoose';

export interface Category {
    _id: string;
    name: string;
    products: any; // Types.ObjectId[];   //ObjectId de mongoDB -> Types.ObjectId
}