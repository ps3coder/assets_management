import mongoose from "mongoose";

const laptopSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["available", "assigned", "under maintenance"],
    default: "available",
  },
  purchaseDate: { type: Date, required: true },
});

const Laptop = mongoose.model("Laptop", laptopSchema);
export default Laptop;
