import mongoose from "mongoose";
const { Schema } = mongoose;

const bookRatingSchema = new Schema(
  {
    workId: {
      type: String,
      required: true,
    },
    review: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
  },
  { timestamps: true } 
);

const BookRating = mongoose.model("BookRating", bookRatingSchema);
export default BookRating;