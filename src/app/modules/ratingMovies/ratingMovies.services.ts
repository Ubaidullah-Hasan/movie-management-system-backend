import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { Movies } from "../movies/movies.model";
import { IRating } from "./ratingMovies.interface"
import { Rating } from "./ratingMovies.model"

// if same user gives rating then it update otherwise it will be created
const ratingIntoDB = async (payload: IRating, myId: string) => {
    const { movie } = payload;
    const existMovie = await Movies.findById(movie);

    if (!existMovie) {
        throw new AppError(StatusCodes.NOT_FOUND, "Movie not found for rating.")
    }

    await Rating.updateOne(
        { movie: movie, rating_by: myId },
        {
            $set: {
                ...payload,
                rating_by: myId,
            }
        },
        { new: true, upsert: true }
    );

    return null;
}

const getMovieAllRating = async (movieId: string) => {
    const ratings = await Rating
        .find({movie: movieId})
        .populate("movie", "title created_by genre ")
        .populate("rating_by", "userName");

    return ratings;
}

export const RatingServices = {
    ratingIntoDB,
    getMovieAllRating,
}