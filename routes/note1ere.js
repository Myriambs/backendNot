//ici c la meilleur façon pour moi , en effet lina n7otou fil url l'id du user w nkhdmou 
// biensure cote front tensouch enou medm 3andek identification 3andk el user fil redux , donc tnejem tjibou w t7tou fil url kif mat7eb wela tb3thou el mouhem ytdhkar 

// tensouch kol backend route tetkhdem tetseta 9bel matouslou lil front .

// Ajouter une tâche pour un utilisateur (POST)

router.post("/:userId", authenticateUser, async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description } = req.body;

    if (userId !== req.user.id) {
      return res.status(403).json({ error: "Accès interdit" });
    }

    const newTodo = new Todo({ title, description, userId });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", authenticateUser, async (req, res) => {
    try {
      const { userId } = req.params;
  
      if (userId !== req.user.id) {
        return res.status(403).json({ error: "Accès interdit" });
      }
  
      const todos = await Todo.find({ userId });
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //lina el userId est l'id de notre user w el id c l'id de notre note , khater ki t3mlou update tensouch enou selon chneya bich tmesou hedhi genrale 
//   ken 3andkom element specifique on peut utiliser el patch si nn 

  router.put("/:userId/:id", authenticateUser, async (req, res) => {
    try {
      const { userId, id } = req.params;
  
      if (userId !== req.user.id) {
        return res.status(403).json({ error: "Accès interdit" });
      }
  
      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: id, userId },
        req.body,
        { new: true }
      );
  
      if (!updatedTodo) {
        return res.status(404).json({ error: "Tâche non trouvée" });
      }
  
      res.status(200).json(updatedTodo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete("/:userId/:id", authenticateUser, async (req, res) => {
    try {
      const { userId, id } = req.params;
  
      if (userId !== req.user.id) {
        return res.status(403).json({ error: "Accès interdit" });
      }
  
      const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId });
  
      if (!deletedTodo) {
        return res.status(404).json({ error: "Tâche non trouvée" });
      }
  
      res.status(200).json({ message: "Tâche supprimée avec succès" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  