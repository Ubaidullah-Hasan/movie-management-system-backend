import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { MoviesRoutes } from '../modules/movies/movies.routes';
import { RatingRoutes } from '../modules/ratingMovies/ratingMovies.routes';
import { ReportRoutes } from '../modules/report/report.routes';

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/movies',
        route: MoviesRoutes,
    },
    {
        path: '/ratings',
        route: RatingRoutes,
    },
    {
        path: '/routes',
        route: ReportRoutes,
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
