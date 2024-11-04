import express from "express";
import { getAdverseEffectsOfDrug } from "./fdaAPI";
var cors = require("cors");

const app = express();
const PORT = 3030;

/*
  params
  name: String
*/
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.get("/drug/effects", async (req, res) => {
  const drugName = req.query.name;
  const pageNumber = req.query.pageNumber;
  const adverseEffects = await getAdverseEffectsOfDrug(drugName, pageNumber);
  res.send(adverseEffects);
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
