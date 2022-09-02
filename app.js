const express = require("express");
const app = express();
const taskRouter = require("./routes/task");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
require('dotenv').config()
app.use(express.static('./public'));
app.use(express.json())
app.use("/api/v1/tasks", taskRouter);
app.use(errorHandlerMiddleware)
app.use(notFound)
const port = process.env.PORT || 3000;

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
