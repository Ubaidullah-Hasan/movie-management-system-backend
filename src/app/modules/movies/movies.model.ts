/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { model, Schema } from "mongoose";
import { IMovie } from "./movies.interface";
import { Rating } from "../ratingMovies/ratingMovies.model";

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

// Virtual field for average rating
movieSchema.virtual('avg_rating').get(async function () {
    const Rating = mongoose.model('Rating'); // Reference the Rating model

    // Fetch aggregate data for this movie's ratings
    const result = await Rating.aggregate([
        { $match: { movie: this._id } }, // Match ratings related to this movie
        {
            $group: {
                _id: '$movie',
                avgRating: { $avg: '$rating' }, // Calculate average
            },
        },
    ]);
    console.log({result});

    return result.length > 0 ? result[0].avgRating : 0; // Return average or default 0
});

// Virtual field for total rating count
movieSchema.virtual('total_rating').get(async function () {
    // const Rating = mongoose.model('Rating'); // Reference the Rating model

    // Fetch count of all ratings for this movie
    const count = await Rating.countDocuments({ movie: this._id });
    console.log({count});
    return count; // Return the total count
});

// Virtual Field: Duration কে hh:mm:ss ফরম্যাটে রূপান্তর
// movieSchema.virtual("formattedDuration").get(function () {
//     const totalSeconds = this.duration;
//     const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
//     const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
//     const seconds = (totalSeconds % 60).toString().padStart(2, "0");
//     return `${hours}:${minutes}:${seconds}`;
// });

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
