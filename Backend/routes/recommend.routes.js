import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import products from "../data/products.js";



dotenv.config();

const router = express.Router();




const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/", async (req, res) => {
  try {
    if (!req.body || !req.body.preference) {
      return res.status(400).json({ message: "Preference is required" });
    }

    const { preference } = req.body;

    const budgetMatch = preference.match(/\d+/);
    const budget = budgetMatch ? Number(budgetMatch[0]) : null;

    const filteredProducts = budget
      ? products.filter(p => p.price <= budget)
      : products;

    const prompt = `
User preference: "${preference}"

Products:
${filteredProducts.map(p => `${p.name} - $${p.price}`).join("\n")}

Return ONLY JSON array:
[{ "name": "string", "price": number }]
`;

    let recommendations = filteredProducts;

    try {
      const result = await model.generateContent(prompt);
      recommendations = JSON.parse(result.response.text());
    } catch {
      recommendations = filteredProducts;
    }

    return res.json(recommendations);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Recommendation failed" });
  }
});

export default router;
