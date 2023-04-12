const express = require("express");
const app = express();
const cors = require("cors");
const PORT = require('dotenv').config()

app.use(cors());


// helpful console output for each interaction, good for auditing purposes
app.use((req, res, next) => {
    console.log(`[${req.method}] Request for path "${req.path}" at ${new Date().toLocaleString('en-US')}`);
    next();
});

// Put routes here



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});