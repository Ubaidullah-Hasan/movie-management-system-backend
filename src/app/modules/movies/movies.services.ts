import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import convertToSeconds from "../../utils/convertToSeconds";
import { IMovie } from "./movies.interface"
import { Movies } from "./movies.model"
import mongoose from "mongoose";

const createMovie = async (payload: IMovie, _id: string) => {
    const duration = payload.duration;
    const strToNumSeconds = convertToSeconds(duration as string);

    const result = await Movies.create({
        ...payload,
        duration: strToNumSeconds,
        created_by: _id,
    });

    return result;
}

const getAllMovies = async () => {

    const movies = await Movies.aggregate([
        {
            $lookup: {
                from: 'ratings', // Rating collection
                localField: '_id',
                foreignField: 'movie',
                as: 'ratings',
            },
        },
        {
            $lookup: {
                from: 'users', // User collection
                localField: 'created_by',
                foreignField: '_id',
                as: 'creator_info', // New field to hold user information
            },
        },
        {
            $addFields: {
                avg_rating: { $avg: '$ratings.rating' },
                total_rating: { $size: '$ratings' },
            },
        },
        {
            $project: {
                ratings: 0, // remove ratings field
                'creator_info.password': 0, // remove password field
                'creator_info.role': 0,
                'creator_info.isDeleted': 0,
                'creator_info.createdAt': 0,
                'creator_info.updatedAt': 0,
                'creator_info.status': 0,
            },
        },
    ]);
    return movies;
}

const getSingleMovies = async (movieId: string) => {
    const movie = await Movies.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(movieId),
            },
        },
        {
            $lookup: {
                from: 'ratings', // Rating collection এর নাম
                localField: '_id',
                foreignField: 'movie',
                as: 'ratings',
            },
        },
        {
            $lookup: {
                from: 'users', // User collection
                localField: 'created_by',
                foreignField: '_id',
                as: 'creator_info', // New field to hold user information
            },
        },
        {
            $addFields: {
                avg_rating: { $avg: '$ratings.rating' }, // গড় রেটিং যোগ করা
                total_rating: { $size: '$ratings' }, // মোট রেটিং সংখ্যা যোগ করা
            },
        },
        {
            $project: {
                ratings: 0, // remove ratings field
                'creator_info.password': 0, // remove password field
                'creator_info.role': 0,
                'creator_info.isDeleted': 0,
                'creator_info.createdAt': 0,
                'creator_info.updatedAt': 0,
                'creator_info.status': 0,
            },
        },
    ]);

    if (movie.length === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Movie not found');
    }

    return movie[0]; // Single movie return
};



const updateAMovies = async (myId: string, movieId: string, payload: Partial<IMovie>) => {
    const isPermission = await Movies.findOne({ _id: movieId, created_by: myId });

    if (!isPermission) {
        throw new AppError(StatusCodes.BAD_REQUEST, "You can't modify another user movie.")
    }

    const duration = payload.duration;
    let strToNumSeconds;

    if (duration) {
        strToNumSeconds = convertToSeconds(duration as string);
    }

    const movies = await Movies.findByIdAndUpdate(movieId,
        {
            ...payload,
            duration: strToNumSeconds,
        },
        { new: true }
    );

    return movies;
}


export const MoviesServices = {
    createMovie,
    getAllMovies,
    getSingleMovies,
    updateAMovies,
}