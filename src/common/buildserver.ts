import express from "express";
import cors from "cors";

export function buildserver() {
  const app = express();

  app.use(cors());

  app.use("/buildserver", express.static("build"));

  app.listen(7999, "wikidot-usertools.localhost");

  console.log("Buildserver up and running.");
}
