import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

//importing routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import batchRoutes from "./routes/batchRoutes.js";
import techRoutes from "./routes/techRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import evaluationRoutes from "./routes/evaluationRoutes.js";
import participantRoutes from "./routes/participantRoutes.js";


dotenv.config();
connectDB();

const app=express();
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/batches",batchRoutes);
app.use("/api/technologies",techRoutes);
app.use("/api/assignments",assignmentRoutes);
app.use("/api/evaluations",evaluationRoutes);
app.use("/api/participants", participantRoutes);


app.get("/", (req,res) => res.send("Mock Evaluation Server is running"));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);    
    }
);

