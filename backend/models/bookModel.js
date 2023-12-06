import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stripeId: {
      type: String,
      default: process.env.BOOK_PRICE,
    }
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model('Book', bookSchema);