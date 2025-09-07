import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use("/buildserver", express.static("build"));

app.listen(7999);
