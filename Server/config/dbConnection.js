const mongoose = require("mongoose");

// MongoDB connection URI
const mongoURI = "mongodb://localhost:27017";

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event listeners for connection
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// Close the MongoDB connection when the Node.js process ends
process.on("SIGINT", () => {
  db.close(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});
