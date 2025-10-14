import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./connection/conn.js";
import Books from "./routes/book.js";
import User from "./routes/user.js";
import Favourite from "./routes/favourite.js";
import Cart from "./routes/cart.js";
import Order from "./routes/order.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
//routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

//creating Port
app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
