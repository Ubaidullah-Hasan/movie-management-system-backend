import config from '../../config';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import AppError from '../../errors/AppError';
import { createToken } from './auth.utils';
import { StatusCodes } from 'http-status-codes';
import { USER_STATUS } from '../User/user.constant';

const loginUser = async (payload: TLoginUser) => {
  const { identifier, password} = payload;

  // checking if the user is exist
  const user = await User.isUserExistsByEmailOrUserName(identifier);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === USER_STATUS[1]) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(password, user?.password)))
    throw new AppError(StatusCodes.FORBIDDEN, "Password does't  matched");

  //create token and sent to the  client

  const jwtPayload = {
    _id: user._id,
    email: user.email,
    role: user.role as string,
    iat: Math.floor(Date.now() /1000),
    // exp already set by default, if again i use it gives error
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_secret_expire_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_secret_expire_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user
  };
};


export const AuthServices = {
  loginUser,
};
