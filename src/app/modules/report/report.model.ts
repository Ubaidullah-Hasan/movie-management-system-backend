import mongoose, { Schema, model } from "mongoose";
import { IReport } from "./report.interface";
import { REPORT_STATUS } from "./report.constant";

const reportSchema = new Schema<IReport>(
    {
        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false, // Optional field
        },
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
            required: [true, "Movie reference is required"],
        },
        reason: {
            type: String,
            required: [true, "Reason is required"],
            trim: true,
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            minlength: [10, "Message must be at least 10 characters long"],
            maxlength: [500, "Message must not exceed 500 characters"],
        },
        status: {
            type: String,
            required: [true, "Status is required"],
            enum: Object.values(REPORT_STATUS),
            default: REPORT_STATUS.PENDING,
        },
    },
    { timestamps: true }
);

// reportSchema.index({ reportedBy : 1, movie: 1}, {unique: true});

export const ReportModel = model<IReport>("Report", reportSchema);
