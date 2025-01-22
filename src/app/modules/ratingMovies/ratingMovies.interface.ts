import { ObjectId } from "mongoose";

export interface IRating extends Document {
    _id?: ObjectId;
    movie: ObjectId; // Foreign key for the Movie collection
    rating_by: ObjectId; // Foreign key for the User who rated
    rating: number; // Rating value (e.g., 1 to 5)
    createdAt?: Date; 
    updatedAt?: Date;
}
