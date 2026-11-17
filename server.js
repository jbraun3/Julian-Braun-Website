// Serves the Vite build now; add API routes above the SPA fallback later.
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), "dist");

app.get("/healthz", (_req, res) => res.send("ok"));

// app.use("/api", apiRouter);   // future backend goes here

app.use(express.static(dist, { maxAge: "1y", index: false }));

// SPA fallback: any other GET returns index.html
app.use((req, res, next) => {
  if (req.method !== "GET") return next();
  res.sendFile(path.join(dist, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));