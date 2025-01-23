import { z } from "zod";
import { REPORT_STATUS } from "./report.constant";

// Extract possible values from REPORT_STATUS
const reportStatusValues = Object.values(REPORT_STATUS) as [string, ...string[]];

export const reportValidationSchema = z.object({
    body: z.object({
        status: z.enum(Object.values(REPORT_STATUS) as [string, ...string[]], {
            required_error: `Status is required. Allowed values are: ${reportStatusValues.join(", ")}`,
            invalid_type_error: `Invalid status. Allowed values are: ${reportStatusValues.join(", ")}`,
        }),
    })
})


export const reportChangeStatusValidationSchema = z.object({
    body: z.object({
        movie: z
            .string()
            .refine((id) => /^[a-f\d]{24}$/i.test(id), { message: "Invalid ObjectId format" }),
        reason: z
            .string({ required_error: "Reason is required" })
            .min(1, "Reason cannot be empty"),
        message: z
            .string({ required_error: "Message is required" })
            .min(10, "Message must be at least 10 characters long")
            .max(500, "Message must not exceed 500 characters"),
        status: z.enum(Object.values(REPORT_STATUS) as [string, ...string[]], {
            required_error: `Status is required. Allowed values are: ${reportStatusValues.join(", ")}`,
            invalid_type_error: `Invalid status. Allowed values are: ${reportStatusValues.join(", ")}`,
        }),
    })
})
