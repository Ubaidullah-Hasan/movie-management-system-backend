import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { Movies } from "../movies/movies.model";
import { IReport } from "./report.interface"
import { ReportModel } from "./report.model"

const createReprtByUser = async(selfId:string, payload: IReport) => {
    const {movie} = payload;
    const existMovie = await Movies.findById(movie);

    if (!existMovie){
        throw new AppError(StatusCodes.NOT_FOUND, "Movie not found!")
    }

    const report = await ReportModel.create({
        ...payload,
        reportedBy: selfId,
    });

    return report;
}



export const ReportServices = {
    createReprtByUser,

}