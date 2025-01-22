import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
      refreshToken,
    },
  });
});





export const AuthControllers = {
  loginUser,
};
