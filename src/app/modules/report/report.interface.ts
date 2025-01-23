import { Document, ObjectId } from "mongoose";

export interface IReport extends Document {
    _id: ObjectId; 
    reportedBy?: ObjectId; // Foreign Key: User who reported
    movie: ObjectId; // Foreign Key: Movie being reported
    reason: string; // Reason for the report
    message: string; // Detailed message explaining the report
    status: string; // Status of the report (e.g., "Pending", "Resolved", "Rejected")
    createdAt?: Date; 
    updatedAt?: Date; 
}
