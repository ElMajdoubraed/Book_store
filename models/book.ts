import mongoose from "mongoose";
import User from "./user";
import Category from "./category";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    story: String,
    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    cover: String,
    author: String,
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
    },
    addBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("id").get(function () {
  return this._id;
});

schema.statics.paginate = async function ({
  limit = 9,
  page = 1,
  sort = -1,
  where = {},
}) {
  const skip = limit * (page - 1);
  const books = await this.find({ ...where })
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: sort })
    .populate("category", "name")
    .exec();

  const pages = Math.ceil((await this.count({ ...where }).exec()) / limit);
  const total = await this.count({}).exec();
  return {
    books,
    pages,
    total,
  };
};

schema.set("toJSON", {
  virtuals: true,
});

export default mongoose.models.Book || mongoose.model("Book", schema);
