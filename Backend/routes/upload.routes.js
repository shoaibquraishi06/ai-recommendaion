import express from "express";
import multer from "multer";
import imagekit from "../config/imagekit.js";

const router = express.Router();

// Store file in memory (recommended)
const upload = multer({ storage: multer.memoryStorage() });

router.post("/image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await imagekit.upload({
      file: req.file.buffer, // required
      fileName: req.file.originalname,
      folder: "uploads",
    });

    res.status(200).json({
      message: "Image uploaded successfully",
      url: result.url,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Image upload failed" });
  }
});

export default router;
