const express = require("express");
const db = require("../data/db");
const router = express.Router({mergeParams: true });

router.post("/",  (req,res) => {  
      const comment = { post_id: req.params.id, text:req.body.text };
      if (!req.body.text) res.status(400).json({ errorMessage: "Please provide text for the comment." });
      db.findById(req.params.id)
        .then( ([post]) => {
           console.log('Line#10', post);
           if(!post.title) res.json(404).json({ message: "The post with the specified ID does not exist." });
           db.insertComment(comment)
             .then( (data) => { 
                console.log('Line 14', data);
                db.findCommentById(data.id)
                  .then( ([comment]) => {
                      res.status(201).json(comment);
                  })
            })            
            .catch(err => {
              res.status(500).json({ error: "There was an error while saving the comment to the database" });

            });
        })
        .catch(err => {
            res.json(500).json({ message: "The post with the specified ID does not exist." });
        }); 
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