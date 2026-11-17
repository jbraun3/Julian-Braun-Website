// Serves the Vite build; add API routes above the SPA fallback later.
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, "dist");

const app = express();

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
