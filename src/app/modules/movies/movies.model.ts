/* eslint-disable @typescript-eslint/no-explicit-any */
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
        }, // save seconds number
        genre: {
            type: String,
            required: true,
            trim: true,
        },
        language: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true, transform: transformDuration }, // Enable virtuals for JSON responses // Custom Transform
        toObject: { virtuals: true, transform: transformDuration }, // Enable virtuals for Object responses
    }
);


// Transform Function: duration ফিল্ডে সেকেন্ডকে hh:mm:ss ফরম্যাটে রূপান্তর
function transformDuration(doc: IMovie, ret: any) {
    const totalSeconds = ret.duration;
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    ret.duration = `${hours}:${minutes}:${seconds}`; // Replace duration with formatted value
    return ret;
}


export const Movies = model<IMovie>('Movie', movieSchema);
