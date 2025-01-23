import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReportServices } from './report.service';

const createReprtByUser = catchAsync(async (req, res) => {
    const { _id } = req.user;
    const result = await ReportServices.createReprtByUser(_id, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Report is created succesfully',
        data: result,
    });
});


const getAllReprts = catchAsync(async (req, res) => {
    const result = await ReportServices.getAllReports();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Report is retrived succesfully',
        data: result,
    });
});


const changeReportStatusBySuperAdmin = catchAsync(async (req, res) => {
    const {reportId} = req.params;
    const result = await ReportServices.changeReportStatusBySuperAdmin(reportId, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Report status updated succesfully',
        data: result,
    });
});


export const ReportControllers = {
    createReprtByUser,
    getAllReprts,
    changeReportStatusBySuperAdmin
};
