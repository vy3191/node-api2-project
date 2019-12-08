const express = require("express");
const server = express();
const portRouter = require("./routes/posts");
const PORT = 8000;

server.use(express.json());
server.use("/api/posts", portRouter);

server.get("/", (req,res) => {
    res.json({Msg: `App is up and running`});
});


server.listen(PORT, () => {
   console.log(`App is running at https://localhost/${PORT}`);
});

