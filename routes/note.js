// routes/todos.js
// lina une façon de faire les choses , ken tla7dhou kol user id ytrbat bi note nzidoha , donc ena ke user 3andi id , nejem nzid w nbedel le nombre d enote mte3i ena 
// meghir manmes les note de jcp aymen , amen ou amir exemple 
// ndhmnou bil ID user enou kol note marbouta bi user mou3yen 
const express = require("express");
const Todo = require("../models/Todo");
const { authenticateUser } = require("../middleware/auth"); // Middleware d'authentification
const router = express.Router();

// Middleware d'authentification
// Exemple simple : req.user contient l'ID utilisateur après vérification
const authenticateUser = (req, res, next) => {
  // Simulation d'authentification
  req.user = { id: "64fda45e89a1f9876d12432b" }; // ID fictif
  next();
};

// Créer une nouvelle tâche
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({ title, description, userId: req.user.id });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer les tâches de l'utilisateur
router.get("/", authenticateUser, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mettre à jour une tâche
router.put("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedTodo) return res.status(404).json({ error: "Tâche non trouvée" });
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer une tâche
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!deletedTodo) return res.status(404).json({ error: "Tâche non trouvée" });
    res.status(200).json({ message: "Tâche supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
