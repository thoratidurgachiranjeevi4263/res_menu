const express = require("express");
const router = express.Router();
const Item = require("../models/item.model");

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new item
router.post("/", async (req, res) => {
  try {
    console.log('📝 POST request received:', req.body);
    const newItem = new Item({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    });
    const savedItem = await newItem.save();
    console.log('✅ Item saved:', savedItem);
    res.status(201).json(savedItem);
  } catch (err) {
    console.error('❌ POST error:', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE item
router.delete("/:id", async (req, res) => {
  try {
    console.log('Delete request for ID:', req.params.id);
    const result = await Item.findByIdAndDelete(req.params.id);
    console.log('Delete result:', result);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
