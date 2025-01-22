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
    {
        timestamps: true,
        toJSON: { virtuals: true }, // Enable virtuals for JSON responses
        toObject: { virtuals: true }, // Enable virtuals for Object responses
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

    return result.length > 0 ? result[0].avgRating : 0; // Return average or default 0
});

// Virtual field for total rating count
movieSchema.virtual('total_rating').get(async function () {
    // const Rating = mongoose.model('Rating'); // Reference the Rating model

    // Fetch count of all ratings for this movie
    const count = await Rating.countDocuments({ movie: this._id });

    return count; // Return the total count
});


export const Movies = model<IMovie>('Movie', movieSchema);
