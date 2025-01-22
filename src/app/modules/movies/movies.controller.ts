import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MoviesServices } from './movies.services';

const createMovie = catchAsync(async (req, res) => {

    const result = await MoviesServices.createMovie(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'New movie is created succesfully',
        data: result,
    });
});


export const MoviesControllers = {
    createMovie,
};
