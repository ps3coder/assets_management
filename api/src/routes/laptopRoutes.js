import express from "express";
import LaptopController from "../controllers/laptopController.js";

const router = express.Router();

router.post("/", LaptopController.createLaptop);

router.get("/", LaptopController.getLaptops);

router.get("/:id", LaptopController.getLaptopByID);

router.put("/:id", LaptopController.updateLaptop);

router.delete("/:id", LaptopController.deleteLaptop);

export default router;
