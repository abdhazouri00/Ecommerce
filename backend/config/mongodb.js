import mongoose from "mongoose";

const connectDB = async (db) => {
  mongoose.connection.on("connected", () => {
    console.log("Connected");
  });

  await mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error:", err));
};

export default connectDB;
