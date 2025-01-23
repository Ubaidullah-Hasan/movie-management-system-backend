import { Router } from "express";
import auth from "../../middlewares/auth";
import { reportChangeStatusValidationSchema, reportValidationSchema } from "./report.validation";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { ReportControllers } from "./report.controller";

const router = Router();

router.post("/",
    auth(USER_ROLE.user),
    validateRequest(reportValidationSchema),
    ReportControllers.createReprtByUser
)  

router.patch("/:reportId",
    auth(USER_ROLE.super_admin),
    validateRequest(reportChangeStatusValidationSchema),
    ReportControllers.changeReportStatusBySuperAdmin
)  

router.get("/",
    auth(USER_ROLE.super_admin),
    ReportControllers.getAllReprts
)  


export const ReportRoutes = router; 