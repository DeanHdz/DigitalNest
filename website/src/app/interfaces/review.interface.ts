export interface Review {
    userId: any; //ObjectId de mongoDB -> Types.ObjectId
    productId: any; //ObjectId de mongoDB -> Types.ObjectId
    comment: string;
    rating: number;
}