import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { Movies } from "../movies/movies.model";
import { IReport } from "./report.interface"
import { ReportModel } from "./report.model"

const createReprtByUser = async (selfId: string, payload: IReport) => {
    const { movie } = payload;
    const existMovie = await Movies.findById(movie);

    if (!existMovie) {
        throw new AppError(StatusCodes.NOT_FOUND, "Movie not found!")
    }

    const report = await ReportModel.create({
        ...payload,
        reportedBy: selfId,
    });

    return report;
}


const getAllReports = async () => {

    const report = await ReportModel
        .find({})
        .populate("movie", "title released_at description duration genre language")
        .populate("reportedBy", "userName email status")
        .sort("-createdAt")
        ;

    return report;
}

const changeReportStatusBySuperAdmin = async (reportId: string, payload: Partial<IReport>) => {
    const existReport = await ReportModel.findById(reportId);

    if (!existReport) {
        throw new AppError(StatusCodes.NOT_FOUND, "Report not found!");
    }

    const result = await ReportModel.findByIdAndUpdate(reportId,
        { payload },
        { new: true }
    )

    return result;
}





export const ReportServices = {
    createReprtByUser,
    getAllReports,
    changeReportStatusBySuperAdmin,
}