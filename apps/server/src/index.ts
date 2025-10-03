import "dotenv/config";
import cors from "cors";
import express from "express";
import router from "./routers";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});

app.use("/api", router);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
