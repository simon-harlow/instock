const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env || 8080;

app.use(cors());

// helpful console output for each interaction, good for auditing purposes
app.use((req, res, next) => {
    console.log(`[${req.method}] Request for path "${req.path}" at ${new Date().toLocaleString('en-US')}`);
    next();
});

// Put routes here

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});