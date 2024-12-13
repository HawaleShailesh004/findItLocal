const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./Routes/userRoutes");
const businessRouter = require("./Routes/businessRoutes");
const serviceRouter = require("./Routes/serviceRoutes");
const bookingRouter = require("./Routes/bookingRoutes");
const availabilityRouter = require("./Routes/availabiltyRoutes");
const categoryRouter = require("./Routes/categoryRoutes");
const paymentRouter = require("./Routes/paymentRoutes");
const reviewRouter = require("./Routes/reviewRoutes");
const discountRouter = require("./Routes/discountRoutes");
const contactRouter = require("./Routes/contactRoutes");

const morgan = require("morgan");
require("dotenv").config();
const { ObjectId } = mongoose.Types;

const server = express();

server.use(morgan("default"));

server.listen(8080, () => {
  console.log("Server Started");
});

main().catch((err) => console.log(err));

server.use(express.json());
server.use(cors());
async function main() {
  await mongoose.connect(
    `mongodb+srv://shailesh:${process.env.DB_PASSWORD}@bdw-cluster.ugy3f.mongodb.net/BDW_Database`
  );
  console.log("connected");
}

server.use("/users", userRouter);
server.use("/business", businessRouter);
server.use("/service", serviceRouter);
server.use("/booking", bookingRouter);
server.use("/availability", availabilityRouter);
server.use("/category", categoryRouter);
server.use("/payment", paymentRouter);
server.use("/review", reviewRouter);
server.use("/discount", discountRouter);
server.use("/contact", contactRouter);

server.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});
