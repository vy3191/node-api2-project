const express = require("express");
const server = express();
// const dotenv = require("dotenv");
const portRouter = require("./routes/posts");
const PORT = process.env.PORT || 8000;


// dotenv.config();
console.log(process.env);
server.use(express.json());
server.use("/api/posts", portRouter);

server.get("/", (req,res) => {
    res.json({
        Msg: "App is up and running",
        cohort: process.env.LAMBDA_COHORT,
        secret: process.env.SECRET_API_KEY
    });
});


server.listen(PORT, () => {
   console.log(`App is running at https://localhost/${PORT}`);
});

