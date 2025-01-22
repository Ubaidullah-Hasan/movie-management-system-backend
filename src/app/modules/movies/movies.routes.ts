import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { MoviesControllers } from "./movies.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { MoviesValidation } from "./movies.validatiion";

const route = Router();

route.post("/create-movies",
    auth(USER_ROLE.user),
    validateRequest(MoviesValidation.createMovieValidationSchema),
    MoviesControllers.createMovie
)

export const MoviesRoutes = route;