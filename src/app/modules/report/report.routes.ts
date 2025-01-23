import { Router } from "express";
import auth from "../../middlewares/auth";
import { reportValidationSchema } from "./report.validation";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { ReportControllers } from "./report.controller";

const router = Router();

router.post("/",
    auth(USER_ROLE.user),
    validateRequest(reportValidationSchema),
    ReportControllers.createReprtByUser
)  


export const ReportRoutes = router; 