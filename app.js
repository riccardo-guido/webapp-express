//imports
const express = require("express");
const cors = require("cors");
const moviesRouter = require("./routers//moviesRouter");
const appPort = 3000;
const appUrl = `http://localhost:${appPort}`;

const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

// express app config
const app = express();
const corsConfig = {
  origin: "http://localhost:5173",
};

//static assets middleware
app.use(cors(corsConfig));
app.use(express.static("public"));
app.use("/images", express.static("images"));

// body parsers middlewares
app.use(express.json());

//routes
app.use("/movies", moviesRouter);

// middlewares

app.use(notFound);
app.use(errorHandler);

// web server listening
app.listen(appPort, () => {
  console.log(`Il server è in ascolto sulla porta  ${appUrl}`);
});
