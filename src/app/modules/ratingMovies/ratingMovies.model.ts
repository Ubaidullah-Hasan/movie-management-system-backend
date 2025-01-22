import mongoose, { Schema, model } from "mongoose";
import { IRating } from "./ratingMovies.interface";

// Define the schema for the Rating model
const ratingSchema = new Schema<IRating>(
    {
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie", // Reference to the Movie model
            required: true,
        },
        rating_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User who rated
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1, // Minimum rating
            max: 5, // Maximum rating
        },
    },
    {
        timestamps: true, // Automatically create createdAt and updatedAt fields
    }
);

ratingSchema.index({movie: 1, rating_by: 1}, {unique: true})

// Create and export the Rating model
export const Rating = model<IRating>("Rating", ratingSchema);
