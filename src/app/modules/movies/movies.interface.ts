import { Document, ObjectId } from "mongoose";

export interface IMovie extends Document {
    _id: string;
    created_by: ObjectId; 
    title: string; 
    description: string;
    released_at: Date; 
    duration: number|string; 
    genre: string; 
    avg_rating?: number; 
    total_rating?: number; 
    language: string; 
    createdAt?: Date; 
    updatedAt?: Date; 
}
