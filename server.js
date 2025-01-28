const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const MONGO_URI = "mongodb+srv://sbhau139:Saloni070705@cluster0.nq7z9.mongodb.net/contactDB?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mongoose Schema
const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  projectName: { type: String, required: true },
  message: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);

// API Endpoint
app.post("/api/contact", async (req, res) => {
  const { fullName, email, projectName, message } = req.body;

  // Validation
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

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
