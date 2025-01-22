import convertToSeconds from "../../utils/convertToSeconds";
import { IMovie } from "./movies.interface"
import { Movies } from "./movies.model"

const createMovie = async(payload:IMovie) => {
    const duration = payload.duration;
    const strToNumSeconds = convertToSeconds(duration as string);

    const result = await Movies.create({
        ...payload,
        duration: strToNumSeconds,
    });

    return result ;
}


export const MoviesServices = {
    createMovie,
}