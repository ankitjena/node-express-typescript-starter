import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import mongoose from "mongoose";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

// Controllers (route handlers)
import * as homeController from "./controllers/home";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));


/**
 * Primary app routes.
 */
app.get("/", homeController.index);

export default app;
