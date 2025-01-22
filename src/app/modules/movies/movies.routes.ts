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

route.get("/", 
    auth(USER_ROLE.user, USER_ROLE.super_admin),
    MoviesControllers.getAllMovies
)

route.get("/:movieId", 
    auth(USER_ROLE.user, USER_ROLE.super_admin),
    MoviesControllers.getSingleMovies
)

route.patch("/:movieId",
    auth(USER_ROLE.user),
    validateRequest(MoviesValidation.updateMovieValidationSchema),
    MoviesControllers.updateSingleMovie
)

export const MoviesRoutes = route;