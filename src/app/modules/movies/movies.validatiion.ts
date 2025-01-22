import { z } from 'zod';


const createMovieValidationSchema = z.object({
  body: z.object({
      created_by: z.string({
          required_error: "Created by (User ID) is required",
      }).regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId format"), // MongoDB ObjectId validation
      title: z.string({
          required_error: "Title is required",
      }).trim().min(1, "Title cannot be empty"),
      description: z.string({
          required_error: "Description is required",
      }).trim().min(1, "Description cannot be empty"),
      released_at: z.string({
          required_error: "Release date is required",
      }).datetime({ message: "Invalid date format. Use ISO 8601 format" }), // Validates ISO date format
      duration: z.string({
          required_error: "Duration is required",
      }).refine((time) => {
          // Regular expression to match hh:mm:ss format
          const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
          return timeRegex.test(time);
      }, {
          message: "Invalid time format. Must be in hh:mm:ss format.",
      }),
      genre: z.string({
          required_error: "Genre is required",
      }).trim().min(1, "Genre cannot be empty"),
      language: z.string({
          required_error: "Language is required",
      }).trim().min(1, "Language cannot be empty"),
  }),
});



export const MoviesValidation = {
    createMovieValidationSchema
};
