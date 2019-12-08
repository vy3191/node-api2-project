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


module.exports = router;