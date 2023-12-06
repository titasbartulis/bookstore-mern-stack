import mongoose from "mongoose";

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
      default: 'price_1OKGyoFa3ryAuRZJWTmjeFEU',
    }
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model('Book', bookSchema);