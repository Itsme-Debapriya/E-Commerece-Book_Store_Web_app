import mongoose from "mongoose";

const order = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    book: {
        type: mongoose.Types.ObjectId,
        ref: "books",
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Out for Delivery, Delivered,Canceled"],
    },
},
{ timestamps: true }
);
export default mongoose.model("order", order);
