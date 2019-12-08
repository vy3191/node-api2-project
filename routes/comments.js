const express = require("express");
const db = require("../data/db");
const router = express.Router({mergeParams: true });

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