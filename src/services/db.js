import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnect = async () => {
    return await mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log(err));
}

