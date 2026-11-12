import express from "express";
import { prisma } from "./lib/prisma";
 
const app = express();
app.use(express.json());
 
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});
 
app.get("/posts", async (req, res) => {
  const wpisy = await prisma.post.findMany({
    include: { category: true, comments: true },
  });
  res.json(wpisy);
});
 
app.listen(3000, () => console.log("http://localhost:3000"));