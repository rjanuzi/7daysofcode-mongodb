import { initializeDatabase } from "./src/repository/db.js";
import express from "express";
import characterRoutes from "./src/service/character-routes.js";

const app = express();
app.use(express.json());

const PORT = 80;

initializeDatabase().then((_) => {});

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`App listening on  http://localhost:${PORT}`);
});

// Add the character routes to the app
app.use("/characters", characterRoutes);
