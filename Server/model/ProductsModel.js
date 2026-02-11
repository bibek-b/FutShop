import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true
    },
    rating : {
        type: Number,
        default: 4.4
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Football Boots", "Football Balls", "Football Jerseys", "Gk Gloves"]
    },
    quantity: {
        type: Number
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }
});

export default mongoose.model("Products", ProductSchema)