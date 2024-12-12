// models/Todo.js
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  //ici nedou el cle etrangere mte3na la reference , lina 3ibara nguoulou kol user 3andou quantite de notes pour lui khw . 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Todo", todoSchema);
