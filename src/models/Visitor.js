import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    }
},
    { timestamps: true });

export default mongoose.model('Visitor', CategorySchema);