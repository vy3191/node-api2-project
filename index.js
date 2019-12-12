const express = require("express");
const server = express();
// const dotenv = require("dotenv");
const portRouter = require("./routes/posts");
const port = process.env.PORT || 8000;
const host = process.env.HOST || "0.0.0.0";


// dotenv.config();

server.use(express.json());
server.use("/api/posts", portRouter);

server.get("/", (req,res) => {
    res.json({
        Msg: "App is up and running",
        cohort: process.env.LAMBDA_COHORT,
        secret: process.env.SECRET_API_KEY
    });
});


server.listen(port, host, () => {
	console.log(`Running at http://${host}:${port}`)
})

