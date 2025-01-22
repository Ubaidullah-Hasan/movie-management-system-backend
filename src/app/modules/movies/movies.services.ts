import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import convertToSeconds from "../../utils/convertToSeconds";
import { IMovie } from "./movies.interface"
import { Movies } from "./movies.model"

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
    const movies = await Movies.find().populate("created_by", "userName -_id");

    return movies;
}

const getSingleMovies = async (movieId: string) => {
    const movies = await Movies.findById(movieId).populate("created_by", "userName -_id");

    return movies;
}


const updateAMovies = async (myId: string,movieId: string, payload: Partial<IMovie>) => {
    const isPermission = await Movies.findOne({_id: movieId, created_by: myId});

    if(!isPermission){
        throw new AppError(StatusCodes.BAD_REQUEST, "You can't modify another user movie.")
    }

    const duration = payload.duration;
    let strToNumSeconds;

    if(duration){
        strToNumSeconds = convertToSeconds(duration as string);
    }

    const movies = await Movies.findByIdAndUpdate(movieId,
        { 
            ...payload, 
            duration: strToNumSeconds, 
        },
        {new: true}
    );

    return movies;
}


export const MoviesServices = {
    createMovie,
    getAllMovies,
    getSingleMovies,
    updateAMovies,
}