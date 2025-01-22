import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MoviesServices } from './movies.services';

const createMovie = catchAsync(async (req, res) => {
    const { _id } = req.user;

    const result = await MoviesServices.createMovie(req.body, _id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'New movie is created succesfully',
        data: result,
    });
});

const getAllMovies = catchAsync(async (req, res) => {
    const result = await MoviesServices.getAllMovies();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Retrieved movies.',
        data: result,
    });
});

const getSingleMovies = catchAsync(async (req, res) => {
    const { movieId } = req.params;
    const result = await MoviesServices.getSingleMovies(movieId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Retrieved single movies.',
        data: result,
    });
});

const updateSingleMovie = catchAsync(async (req, res) => {
    const { movieId } = req.params;
    const { _id } = req.user;
    const result = await MoviesServices.updateAMovies(_id, movieId, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Update single movie.',
        data: result,
    });
});


export const MoviesControllers = {
    createMovie,
    getAllMovies,
    getSingleMovies,
    updateSingleMovie
};
