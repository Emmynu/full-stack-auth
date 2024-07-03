import mongoose from "mongoose"

export async function connectDB() {
  try {
    mongoose.connect("mongodb+srv://oketunbiolufunke:SAVxUGHvh4rzWpBP@social-media-project.vq5qbri.mongodb.net/app")
  } catch (error) {
    console.log("connection failed");
  }
}
