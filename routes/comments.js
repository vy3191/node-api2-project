const express = require("express");
const db = require("../data/db");
const router = express.Router({mergeParams: true });

router.post("/",  (req,res) => {  
      const { id } = req.params;
      db.findCommentById(id)
        .then(data => {
            return res.json(data)
        })
        .then(data => db.insertComment(req.body.text))
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: "There was an error while saving the comment to the database" }))
     

      // if (!req.body.text) res.status(400).json({ errorMessage: "Please provide text for the comment." });
      // db.insertComment(req.body.text)
      //   .then( data => {
      //      if(!data) res.status(404).json({ message: "The post with the specified ID does not exist." });
      //      res.status(201).json(data);
      //   })
      //   .catch(err => {
      //     res.status(500).json({ error: "There was an error while saving the comment to the database" });

      //   });
});

router.get("/", async (req,res) => {
   try {
    const comments = await db.findPostComments(req.params.id);
    
    if(comments.length === 0) res.status(404).json({ message: "The post with the specified ID does not exist." });
    res.status(200).json(comments);   
   } catch {
     res.status(500).json({error:"The comments information could not be retrieved."});
   }
  
});

router.get("/:commentId", async (req,res) => {
    try {
      const comment = await db.findCommentById(req.params.commentId);
      console.log(comment);
      if(comment.length ===0) res.status(404).json({message:"The post with the speciifed ID comment does not exist."});
      res.status(200).json(comment)
    } catch {
      res.status(500).json({error:"The comments information could not be retrieved."});
    }
})


module.exports = router;