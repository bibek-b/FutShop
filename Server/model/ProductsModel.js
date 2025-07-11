import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true
    },
    rating : {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

export default mongoose.model("Products", ProductSchema)