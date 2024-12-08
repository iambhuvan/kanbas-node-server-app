import mongoose from "mongoose";
const schema = new mongoose.Schema(
 {
   title: String,
   course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
   notAvailableUntil: Date,
   due:Date,
   description:String,
   points:Number,
   submissionType: {
    type: String,
    enum: ["Online", "In-person"],
    default: "Online",
  },   
  assignmentGroup: String

 },
 { collection: "assignments" }
);
export default schema;