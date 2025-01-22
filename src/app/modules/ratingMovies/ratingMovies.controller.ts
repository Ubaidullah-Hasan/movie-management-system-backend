import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RatingServices } from './ratingMovies.services';

const movieRating = catchAsync(async (req, res) => {
    const { _id } = req.user;

    const result = await RatingServices.ratingIntoDB(req.body, _id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Rating is modified succesfully',
        data: result,
    });
});


const getMovieAllRating = catchAsync(async (req, res) => {
    const { movieId } = req.params;

    const result = await RatingServices.getMovieAllRating(movieId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Rating retrieved successfully.',
        data: result,
    });
});



export const RatingControllers = {
    movieRating,
    getMovieAllRating,
};
