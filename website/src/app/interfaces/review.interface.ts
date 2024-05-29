export interface Review {
    _id: string;
    userId: any; //ObjectId de mongoDB -> Types.ObjectId
    productId: any; //ObjectId de mongoDB -> Types.ObjectId
    comment: string;
    rating: number;
}