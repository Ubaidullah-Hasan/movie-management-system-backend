import { Document } from "mongoose";

export interface IMovie extends Document {
    created_by: string; 
    title: string; 
    description: string;
    released_at: Date; 
    duration: number; 
    genre: string; 
    avg_rating?: number; 
    total_rating?: number; 
    language: string; 
    createdAt?: Date; 
    updatedAt?: Date; 
}
