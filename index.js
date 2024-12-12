// server.js
const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todos");

const app = express();
app.use(express.json());

// Connexion à MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/todos", todoRoutes);

// Démarrage du serveur
const PORT = 5000;
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));
