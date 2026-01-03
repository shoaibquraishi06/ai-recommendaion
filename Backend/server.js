import dotenv from 'dotenv';
dotenv.config({});
import express from "express";
import cors from "cors";
import recommendRoutes from "./routes/recommend.routes.js";
import uploadRoutes from "./routes/upload.routes.js";


const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json()); 


app.use("/api/upload", uploadRoutes);
app.use("/api/recommend", recommendRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
