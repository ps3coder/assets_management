import Laptop from "../models/Laptop.js";
import Maintenance from "../models/Maintenance.js";

class LaptopController {
  // for creating a laptop
  static async createLaptop(req, res) {
    const { brand, model, serialNumber, status, purchaseDate } = req.body;
    try {
      const laptop = new Laptop({
        brand,
        model,
        serialNumber,
        status,
        purchaseDate,
      });
      await laptop.save();
      res.status(201).json(laptop);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  // for all laptops fetching
  static async getLaptops(req, res) {
    try {
      const laptops = await Laptop.find();
      res.json(laptops);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  // get a specific laptop by ID
  static async getLaptopByID(req, res) {
    const { id } = req.params;
    try {
      const laptop = await Laptop.findById(id);
      if (!laptop) {
        return res.status(404).json({ message: "Laptop not found" });
      }
      res.json(laptop);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  // Update a laptop's information
  static async updateLaptop(req, res) {
    const { id } = req.params;
    const { brand, model, serialNumber, status, purchaseDate } = req.body;
    try {
      const laptop = await Laptop.findByIdAndUpdate(
        id,
        {
          brand,
          model,
          serialNumber,
          status,
          purchaseDate,
        },
        { new: true }
      );
      if (!laptop) {
        return res.status(404).json({ message: "Laptop not found" });
      }
      res.json(laptop);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  // for deleting laptop
  static async deleteLaptop(req, res) {
    const { id } = req.params;
    try {
      const laptop = await Laptop.findByIdAndDelete(id);
      if (!laptop) {
        return res.status(404).json({ message: "Laptop not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async addMaintenanceLog(req, res) {
    const { laptopId, maintenanceType, description } = req.body;
    try {
      const maintenance = new Maintenance({
        laptop: laptopId,
        maintenanceType,
        description,
      });
      await maintenance.save();

      await Laptop.findByIdAndUpdate(laptopId, { status: "under maintenance" });

      res
        .status(201)
        .json({ message: "Maintenance logged successfully.", maintenance });
    } catch (error) {
      res.status(500).json({ message: `Error: ${error.message}` });
    }
  }
}
export default LaptopController;
