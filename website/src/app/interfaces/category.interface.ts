//import { Types } from 'mongoose';

export interface Category {
    name: string;
    img: string;
    products: any; // Types.ObjectId[];   //ObjectId de mongoDB -> Types.ObjectId
}