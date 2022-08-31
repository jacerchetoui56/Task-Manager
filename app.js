const express = require("express");
const app = express();
const taskRouter = require("./routes/task");
const connectDB = require("./db/connect");
require('dotenv').config()

app.use(express.json())
app.use("/api/v1/tasks", taskRouter);
const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Port is listening on port ${port} ....`);
        });
    } catch (error) {
        console.log(error);
    }
};

start()
