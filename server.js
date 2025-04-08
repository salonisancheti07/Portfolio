const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const MONGO_URI =
"mongodb+srv://saloni:Saloni070705@portfolio.zwi1p2w.mongodb.net/?retryWrites=true&w=majority&appName=portfolio";

mongoose
.connect(MONGO_URI)
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Mongoose Schema
const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  projectName: { type: String, required: true },
  message: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);

// ✅ Root route (for browser access)
app.get("/", (req, res) => {
  res.send("🚀 Welcome to Saloni's Portfolio Backend!");
});

// ✅ POST route: Submit contact form
app.post("/api/contact", async (req, res) => {
  const { fullName, email, projectName, message } = req.body;

  if (!fullName || !email || !projectName || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newContact = new Contact({ fullName, email, projectName, message });
    await newContact.save();
    res.status(200).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res.status(500).json({ error: "An error occurred while submitting the form" });
  }
});

// ✅ GET route: View all submissions (admin-like view)
app.get("/api/contact", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contact form submissions" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
