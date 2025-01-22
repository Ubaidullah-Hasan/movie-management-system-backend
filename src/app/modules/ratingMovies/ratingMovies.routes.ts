import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { RatingValidation } from "./ratingMovies.validatiion";
import { RatingControllers } from "./ratingMovies.controller";

const router = Router();

router.post("/",
    auth(USER_ROLE.user),
    validateRequest(RatingValidation.createRatingValidationSchema),
    RatingControllers.movieRating
)


router.get("/movies-rating/:movieId",
    auth(USER_ROLE.user, USER_ROLE.super_admin),
    RatingControllers.getMovieAllRating
)

export const RatingRoutes = router;
