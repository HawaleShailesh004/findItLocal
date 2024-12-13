const express = require("express");
const router = express.Router();
const Category = require("../Model/CategoryModel");

// Create a new category
router.post("/create", async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = new Category({
      name,
      description,
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all categories
router.get("/allcategories", async (req, res) => {
  try {
    const categories = await Category.find().populate("subcategories");
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/allservicenames", async (req, res) => {
    try {
      const categories = await Category.find().populate("subcategories");
      
      const serviceNames = categories.map(category => {
        const mainName = category.name;
        const subNames = category.subcategories.map(subcategory => subcategory.name);
        return [mainName, ...subNames];
      }).flat(); // Flatten the array
  
      res.status(200).json(serviceNames);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Get category by ID
router.get("/category/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("subcategories");
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update category
router.put("/update/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete category
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndRemove(req.params.id);
    if (!deletedCategory) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a subcategory to a specific category
router.post("/subcategory/:id", async (req, res) => {
  const { subcategoryId } = req.body;

  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    category.subcategories.push(subcategoryId);
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove a subcategory from a specific category
router.delete("/subcategory/:id/:subId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    category.subcategories.pull(req.params.subId);
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
