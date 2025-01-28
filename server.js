const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Local Connection String
const MONGO_URI = "mongodb://localhost:27017/contactDB";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB locally"))
  .catch((err) => console.error("Database connection error:", err));

// MongoDB Schema and Model
const contactSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  project: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// API Endpoints
app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, email, project, message } = req.body;
    const newContact = new Contact({ fullName, email, project, message });
    await newContact.save();
    res.status(201).json({ message: "Contact saved successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ message: "Failed to save contact." });
  }
});

app.get("/api/contact", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Failed to fetch contacts." });
  }
});

// Server Start
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
