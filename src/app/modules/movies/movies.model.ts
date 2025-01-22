import mongoose, { model, Schema } from "mongoose";
import { IMovie } from "./movies.interface";

const movieSchema = new Schema(
    {
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        released_at: {
            type: Date,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        genre: {
            type: String,
            required: true,
            trim: true,
        },
        // avg_rating: {
        //     type: Number,
        //     default: 0,
        // },
        // total_rating: {
        //     type: Number,
        //     default: 0,
        // },
        language: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

export const Movies = model<IMovie>('Movie', movieSchema);
