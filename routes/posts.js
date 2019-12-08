const express = require("express");
const db = require("../data/db");


const router = express.Router();

router.get("/", async (req,res) => {
   try {
     const posts = await db.find();
     res.status(200).json(posts)
   } catch(error) {
     console.log(error);
     res.status(500).json({ error: "The posts information could not be retrieved." });
   }
});

router.get("/:id", async (req,res) => {
   try {
     const data = await db.findById(req.params.id);
     const user = data[0];
     if(!user.title) res.status(404).json({ message: `The post with the specified POST-ID ${id} does not exist.`});
     res.status(200).json(user);
   }catch(err) {
     res.status(500).json({error: `The post information with id ${req.params.id} could not be retrieved.` });
   }
});

router.post("/", async (req,res) => {
   try {
      const {title,contents} = req.body;
      if(!title || !contents) res.json(400).json({ errorMessage: "Please provide title and contents for the post." });
      const newPost = await db.insert({title,contents});
      const createdPost = await db.findById(newPost.id)
      console.log(createdPost)
      res.status(201).json(createdPost)
   }catch(error) {
      res.status(500).json({ error: "There was an error while saving the post to the database" });
   }
})

module.exports = router;