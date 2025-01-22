import { z } from 'zod';


const createRatingValidationSchema = z.object({
    body: z.object({
        movie: z.string({
            required_error: "Movie ID is required",
        }).regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId format"), // MongoDB ObjectId validation
        rating: z.number({
            required_error: "Rating is required",
        })
            .min(1, "Rating must be at least 1")
            .max(5, "Rating cannot be more than 5"),
    }),
});



export const RatingValidation = {
    createRatingValidationSchema
};
