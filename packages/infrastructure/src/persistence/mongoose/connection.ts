import mongoose from "mongoose";

export async function connectMongoose(url: string) {
  await mongoose.connect(url);
}
